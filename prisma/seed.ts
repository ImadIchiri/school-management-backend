import prisma from "../src/config/prisma.ts";

async function main() {
  console.log("🌱 Seeding database...");

  // ========================
  // ROLES
  // ========================
  const [adminRole, enseignantRole, etudiantRole] = await Promise.all([
    prisma.role.upsert({
      where: { name: "ADMIN" },
      update: {},
      create: { name: "ADMIN", description: "Administrateur principal" },
    }),
    prisma.role.upsert({
      where: { name: "ENSEIGNANT" },
      update: {},
      create: {
        name: "ENSEIGNANT",
        description: "Professeur de l’établissement",
      },
    }),
    prisma.role.upsert({
      where: { name: "ETUDIANT" },
      update: {},
      create: {
        name: "ETUDIANT",
        description: "Étudiant inscrit dans une filière",
      },
    }),
  ]);
  console.log("✅ Roles created");

  // ========================
  // PERMISSIONS
  // ========================
  const [manageUsers, viewCourses] = await Promise.all([
    prisma.permission.upsert({
      where: { name: "manage_users" },
      update: {},
      create: {
        name: "manage_users",
        description: "Peut gérer les utilisateurs",
      },
    }),
    prisma.permission.upsert({
      where: { name: "view_courses" },
      update: {},
      create: { name: "view_courses", description: "Peut consulter les cours" },
    }),
  ]);

  await prisma.rolePermission.createMany({
    data: [
      { roleId: adminRole.id, permissionId: manageUsers.id },
      { roleId: adminRole.id, permissionId: viewCourses.id },
      { roleId: enseignantRole.id, permissionId: viewCourses.id },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Permissions linked");

  // ========================
  // USERS
  // ========================
  const [adminUser, enseignantUser, etudiantUser] = await Promise.all([
    prisma.user.upsert({
      where: { email: "admin@school.com" },
      update: {},
      create: {
        nom: "Admin",
        prenom: "Principal",
        dateNaissance: new Date("1990-01-01"),
        adresse: "Casablanca",
        telephone: "0600000000",
        email: "admin@school.com",
        password: "admin123", // plain text for dev
        roleId: adminRole.id,
      },
    }),
    prisma.user.upsert({
      where: { email: "prof@school.com" },
      update: {},
      create: {
        nom: "Professeur",
        prenom: "Ahmed",
        dateNaissance: new Date("1985-05-10"),
        adresse: "Rabat",
        telephone: "0611111111",
        email: "prof@school.com",
        password: "prof123",
        roleId: enseignantRole.id,
      },
    }),
    prisma.user.upsert({
      where: { email: "etudiant@school.com" },
      update: {},
      create: {
        nom: "Etudiant",
        prenom: "Youssef",
        dateNaissance: new Date("2002-03-15"),
        adresse: "Marrakech",
        telephone: "0622222222",
        email: "etudiant@school.com",
        password: "etu123",
        roleId: etudiantRole.id,
      },
    }),
  ]);
  console.log("✅ Users created");

  // ========================
  // EMPLOYE (for the enseignant)
  // ========================
  // Enseignant is linked to an Employe (employeId). Create Employe first.
  const employeData = await prisma.employe.upsert({
    where: { userId: enseignantUser.id },
    update: {},
    create: {
      userId: enseignantUser.id,
      poste: "Professeur",
      salaire: 30000,
    },
  });
  console.log("✅ Employe created for enseignant");

  // ========================
  // ENSEIGNANT
  // ========================
  const enseignantData = await prisma.enseignant.upsert({
    where: { employeId: employeData.idEmploye },
    update: {},
    create: {
      employeId: employeData.idEmploye,
      specialite: "Informatique",
    },
  });
  console.log("✅ Enseignant created");

  // ========================
  // FILIERE + NIVEAU (NiveauScolaire)
  // ========================
  const filiere = await prisma.filiere.upsert({
    where: { nom: "Informatique" },
    update: {},
    create: {
      nom: "Informatique",
      description: "Formation en développement logiciel",
      niveaux: {
        create: [
          {
            anneeLabel: "2025-2026",
            dateDebut: new Date("2025-10-01"),
            dateFin: new Date("2026-07-15"),
          },
        ],
      },
    },
    include: { niveaux: true },
  });

  const niveau = filiere.niveaux[0];
  console.log("✅ Filière et niveau créés");

  // ========================
  // GROUPE (required by Etudiant)
  // ========================
  const groupe = await prisma.groupe.upsert({
    where: { nom: "Groupe 1" },
    update: {},
    create: {
      nom: "Groupe 1",
      niveauId: niveau.id,
    },
  });
  console.log("✅ Groupe created");

  // ========================
  // ETUDIANT
  // ========================
  const etudiant = await prisma.etudiant.upsert({
    where: { userId: etudiantUser.id },
    update: {},
    create: {
      userId: etudiantUser.id,
      matricule: "ETU001",
      dateInscription: new Date("2025-09-15"),
      filiereId: filiere.id,
      groupeId: groupe.id,
    },
  });
  console.log("✅ Étudiant créé");

  // ========================
  // CANDIDAT (create a User first then Candidat linked to that user)
  // ========================
  const saraUser = await prisma.user.upsert({
    where: { email: "sara@example.com" },
    update: {},
    create: {
      nom: "Sara",
      prenom: "El Amrani",
      dateNaissance: new Date("2003-07-12"),
      adresse: "Fès",
      telephone: "0633333333",
      email: "sara@example.com",
      password: "sara123",
      roleId: null,
    },
  });

  const candidat = await prisma.candidat.upsert({
    where: { userId: saraUser.id },
    update: {},
    create: {
      userId: saraUser.id,
      dateCandidature: new Date(),
      etat: "en_attente",
      filiere: "Informatique",
      niveau: "BACHELOR_2",
    },
  });
  console.log("✅ Candidat créé (lié à un User)");

  // ========================
  // MODULE
  // ========================
  const module = await prisma.module.create({
    data: {
      nom: "Programmation Web",
      description: "HTML, CSS, JS et frameworks modernes",
      niveauId: niveau.id,
    },
  });

  // Lier le module à l'enseignant via ModuleEnseignant
  await prisma.moduleEnseignant.create({
    data: {
      dateAffectation: new Date(),
      enseignantId: enseignantData.idEnseignant,
      moduleId: module.id,
    },
  });

  console.log("✅ Module créé et affecté à l'enseignant");

  // ========================
  // SALLE
  // ========================
  const salle = await prisma.salle.upsert({
    where: { nom: "Salle 101" },
    update: {},
    create: {
      nom: "Salle 101",
      capacite: 30,
    },
  });
  console.log("✅ Salle créée");

  // ========================
  // COURS
  // ========================
  const cours = await prisma.cours.create({
    data: {
      titre: "Introduction à JavaScript",
      description: "Les bases du langage JS.",
      dateDebut: new Date("2025-11-01T08:00:00Z"),
      dateFin: new Date("2025-11-01T10:00:00Z"),
      moduleId: module.id,
      enseignantId: enseignantData.idEnseignant,
      salleId: salle.id,
    },
  });
  console.log("✅ Cours créé");

  // ========================
  // PLANNING (emploi du temps)
  // ========================
  const planning = await prisma.planning.create({
    data: {
      dateDebut: new Date("2025-11-01T09:00:00Z"),
      dateFin: new Date("2025-11-01T11:00:00Z"),
      description: "Séance Introduction JS",
      coursId: cours.id,
      enseignantId: enseignantData.idEnseignant,
      salleId: salle.id,
    },
  });
  console.log("✅ Planning créé");

  // ========================
  // ABSENCE
  // ========================
  await prisma.absence.create({
    data: {
      etudiantId: etudiant.idEtudiant,
      coursId: cours.id,
      date: new Date("2025-10-03"),
      motif: "Maladie",
      // statut defaults to PRESENT, you can override if needed
    },
  });
  console.log("✅ Absence enregistrée");

  console.log("🌿 Seed terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
