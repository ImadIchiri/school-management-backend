-- CreateEnum
CREATE TYPE "EtatCandidature" AS ENUM ('en_attente', 'en_cours', 'accepte', 'refuse', 'incomplet');

-- CreateEnum
CREATE TYPE "StatutPresence" AS ENUM ('PRESENT', 'ABSENT', 'RETARD', 'JUSTIFIE');

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "adresse" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidat" (
    "idCandidature" SERIAL NOT NULL,
    "dateCandidature" TIMESTAMP(3) NOT NULL,
    "etat" "EtatCandidature" NOT NULL DEFAULT 'en_attente',
    "userId" INTEGER NOT NULL,
    "etudiantIdEtudiant" INTEGER,

    CONSTRAINT "Candidat_pkey" PRIMARY KEY ("idCandidature")
);

-- CreateTable
CREATE TABLE "Etudiant" (
    "idEtudiant" SERIAL NOT NULL,
    "matricule" TEXT NOT NULL,
    "dateInscription" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "filiereId" INTEGER NOT NULL,
    "groupeId" INTEGER NOT NULL,

    CONSTRAINT "Etudiant_pkey" PRIMARY KEY ("idEtudiant")
);

-- CreateTable
CREATE TABLE "Employe" (
    "idEmploye" SERIAL NOT NULL,
    "poste" TEXT NOT NULL,
    "salaire" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Employe_pkey" PRIMARY KEY ("idEmploye")
);

-- CreateTable
CREATE TABLE "Enseignant" (
    "idEnseignant" SERIAL NOT NULL,
    "specialite" TEXT NOT NULL,
    "employeId" INTEGER NOT NULL,

    CONSTRAINT "Enseignant_pkey" PRIMARY KEY ("idEnseignant")
);

-- CreateTable
CREATE TABLE "Parent" (
    "idParent" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("idParent")
);

-- CreateTable
CREATE TABLE "Filiere" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Filiere_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NiveauScolaire" (
    "id" SERIAL NOT NULL,
    "anneeLabel" TEXT NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "filiereId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NiveauScolaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groupe" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "niveauId" INTEGER NOT NULL,

    CONSTRAINT "Groupe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "niveauId" INTEGER NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cours" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "duree" INTEGER,
    "moduleId" INTEGER NOT NULL,
    "enseignantId" INTEGER,
    "salleId" INTEGER,

    CONSTRAINT "Cours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeRessource" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "TypeRessource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ressource" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uploadedById" INTEGER,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "Ressource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoursRessource" (
    "id" SERIAL NOT NULL,
    "coursId" INTEGER NOT NULL,
    "ressourceId" INTEGER NOT NULL,

    CONSTRAINT "CoursRessource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Examen" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "coeff" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "dureeMinutes" INTEGER,
    "moduleId" INTEGER NOT NULL,
    "enseignantId" INTEGER NOT NULL,
    "salleId" INTEGER,

    CONSTRAINT "Examen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absence" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "motif" TEXT,
    "statut" "StatutPresence" NOT NULL DEFAULT 'PRESENT',
    "etudiantId" INTEGER NOT NULL,
    "coursId" INTEGER NOT NULL,

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salle" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "capacite" INTEGER NOT NULL,

    CONSTRAINT "Salle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Planning" (
    "id" SERIAL NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "coursId" INTEGER NOT NULL,
    "enseignantId" INTEGER NOT NULL,
    "salleId" INTEGER NOT NULL,

    CONSTRAINT "Planning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "employeId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opportunite" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "employeId" INTEGER NOT NULL,

    CONSTRAINT "Opportunite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleEnseignant" (
    "id" SERIAL NOT NULL,
    "dateAffectation" TIMESTAMP(3) NOT NULL,
    "enseignantId" INTEGER NOT NULL,
    "moduleId" INTEGER NOT NULL,

    CONSTRAINT "ModuleEnseignant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EtudiantExamen" (
    "id" SERIAL NOT NULL,
    "present" BOOLEAN NOT NULL,
    "note" DOUBLE PRECISION NOT NULL,
    "mention" TEXT NOT NULL,
    "dateEvaluation" TIMESTAMP(3) NOT NULL,
    "etudiantId" INTEGER NOT NULL,
    "examenId" INTEGER NOT NULL,

    CONSTRAINT "EtudiantExamen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EtudiantToParent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EtudiantToParent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EtudiantToEvent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EtudiantToEvent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EtudiantToOpportunite" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EtudiantToOpportunite_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EnseignantToGroupe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EnseignantToGroupe_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidat_userId_key" ON "Candidat"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Etudiant_matricule_key" ON "Etudiant"("matricule");

-- CreateIndex
CREATE UNIQUE INDEX "Etudiant_userId_key" ON "Etudiant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Employe_userId_key" ON "Employe"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Enseignant_employeId_key" ON "Enseignant"("employeId");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_userId_key" ON "Parent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TypeRessource_nom_key" ON "TypeRessource"("nom");

-- CreateIndex
CREATE INDEX "_EtudiantToParent_B_index" ON "_EtudiantToParent"("B");

-- CreateIndex
CREATE INDEX "_EtudiantToEvent_B_index" ON "_EtudiantToEvent"("B");

-- CreateIndex
CREATE INDEX "_EtudiantToOpportunite_B_index" ON "_EtudiantToOpportunite"("B");

-- CreateIndex
CREATE INDEX "_EnseignantToGroupe_B_index" ON "_EnseignantToGroupe"("B");

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidat" ADD CONSTRAINT "Candidat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidat" ADD CONSTRAINT "Candidat_etudiantIdEtudiant_fkey" FOREIGN KEY ("etudiantIdEtudiant") REFERENCES "Etudiant"("idEtudiant") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etudiant" ADD CONSTRAINT "Etudiant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etudiant" ADD CONSTRAINT "Etudiant_filiereId_fkey" FOREIGN KEY ("filiereId") REFERENCES "Filiere"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etudiant" ADD CONSTRAINT "Etudiant_groupeId_fkey" FOREIGN KEY ("groupeId") REFERENCES "Groupe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employe" ADD CONSTRAINT "Employe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enseignant" ADD CONSTRAINT "Enseignant_employeId_fkey" FOREIGN KEY ("employeId") REFERENCES "Employe"("idEmploye") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NiveauScolaire" ADD CONSTRAINT "NiveauScolaire_filiereId_fkey" FOREIGN KEY ("filiereId") REFERENCES "Filiere"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Groupe" ADD CONSTRAINT "Groupe_niveauId_fkey" FOREIGN KEY ("niveauId") REFERENCES "NiveauScolaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_niveauId_fkey" FOREIGN KEY ("niveauId") REFERENCES "NiveauScolaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cours" ADD CONSTRAINT "Cours_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cours" ADD CONSTRAINT "Cours_enseignantId_fkey" FOREIGN KEY ("enseignantId") REFERENCES "Enseignant"("idEnseignant") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cours" ADD CONSTRAINT "Cours_salleId_fkey" FOREIGN KEY ("salleId") REFERENCES "Salle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ressource" ADD CONSTRAINT "Ressource_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ressource" ADD CONSTRAINT "Ressource_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TypeRessource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursRessource" ADD CONSTRAINT "CoursRessource_coursId_fkey" FOREIGN KEY ("coursId") REFERENCES "Cours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursRessource" ADD CONSTRAINT "CoursRessource_ressourceId_fkey" FOREIGN KEY ("ressourceId") REFERENCES "Ressource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examen" ADD CONSTRAINT "Examen_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examen" ADD CONSTRAINT "Examen_enseignantId_fkey" FOREIGN KEY ("enseignantId") REFERENCES "Enseignant"("idEnseignant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examen" ADD CONSTRAINT "Examen_salleId_fkey" FOREIGN KEY ("salleId") REFERENCES "Salle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "Etudiant"("idEtudiant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_coursId_fkey" FOREIGN KEY ("coursId") REFERENCES "Cours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planning" ADD CONSTRAINT "Planning_coursId_fkey" FOREIGN KEY ("coursId") REFERENCES "Cours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planning" ADD CONSTRAINT "Planning_enseignantId_fkey" FOREIGN KEY ("enseignantId") REFERENCES "Enseignant"("idEnseignant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planning" ADD CONSTRAINT "Planning_salleId_fkey" FOREIGN KEY ("salleId") REFERENCES "Salle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_employeId_fkey" FOREIGN KEY ("employeId") REFERENCES "Employe"("idEmploye") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunite" ADD CONSTRAINT "Opportunite_employeId_fkey" FOREIGN KEY ("employeId") REFERENCES "Employe"("idEmploye") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleEnseignant" ADD CONSTRAINT "ModuleEnseignant_enseignantId_fkey" FOREIGN KEY ("enseignantId") REFERENCES "Enseignant"("idEnseignant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleEnseignant" ADD CONSTRAINT "ModuleEnseignant_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtudiantExamen" ADD CONSTRAINT "EtudiantExamen_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "Etudiant"("idEtudiant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtudiantExamen" ADD CONSTRAINT "EtudiantExamen_examenId_fkey" FOREIGN KEY ("examenId") REFERENCES "Examen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EtudiantToParent" ADD CONSTRAINT "_EtudiantToParent_A_fkey" FOREIGN KEY ("A") REFERENCES "Etudiant"("idEtudiant") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EtudiantToParent" ADD CONSTRAINT "_EtudiantToParent_B_fkey" FOREIGN KEY ("B") REFERENCES "Parent"("idParent") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EtudiantToEvent" ADD CONSTRAINT "_EtudiantToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Etudiant"("idEtudiant") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EtudiantToEvent" ADD CONSTRAINT "_EtudiantToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EtudiantToOpportunite" ADD CONSTRAINT "_EtudiantToOpportunite_A_fkey" FOREIGN KEY ("A") REFERENCES "Etudiant"("idEtudiant") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EtudiantToOpportunite" ADD CONSTRAINT "_EtudiantToOpportunite_B_fkey" FOREIGN KEY ("B") REFERENCES "Opportunite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnseignantToGroupe" ADD CONSTRAINT "_EnseignantToGroupe_A_fkey" FOREIGN KEY ("A") REFERENCES "Enseignant"("idEnseignant") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnseignantToGroupe" ADD CONSTRAINT "_EnseignantToGroupe_B_fkey" FOREIGN KEY ("B") REFERENCES "Groupe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
