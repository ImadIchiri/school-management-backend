import prisma from "../src/config/prisma";

export const seedPermissions = async () => {
  // Permissions List {name: string, description: string}
  const permissions = [
    // --- AUTH / USERS ---
    { name: "user_create", description: "Créer un utilisateur" },
    { name: "user_read", description: "Voir les utilisateurs" },
    { name: "user_update", description: "Modifier un utilisateur" },
    { name: "user_delete", description: "Supprimer un utilisateur" },

    // --- ROLES ---
    { name: "role_create", description: "Créer un rôle" },
    { name: "role_read", description: "Voir les rôles" },
    { name: "role_update", description: "Modifier un rôle" },
    { name: "role_delete", description: "Supprimer un rôle" },

    // --- PERMISSIONS ---
    { name: "permission_read", description: "Voir la liste des permissions" },
    {
      name: "permission_assign",
      description: "Assigner des permissions à un rôle",
    },

    // --- FILIERES ---
    { name: "filiere_create", description: "Créer une filière" },
    { name: "filiere_read", description: "Voir les filières" },
    { name: "filiere_update", description: "Modifier une filière" },
    { name: "filiere_delete", description: "Supprimer une filière" },

    // --- NIVEAUX ---
    { name: "niveau_create", description: "Créer un niveau scolaire" },
    { name: "niveau_read", description: "Voir les niveaux scolaires" },
    { name: "niveau_update", description: "Modifier un niveau scolaire" },
    { name: "niveau_delete", description: "Supprimer un niveau scolaire" },

    // --- GROUPES ---
    { name: "groupe_create", description: "Créer un groupe" },
    { name: "groupe_read", description: "Voir les groupes" },
    { name: "groupe_update", description: "Modifier un groupe" },
    { name: "groupe_delete", description: "Supprimer un groupe" },

    // --- MODULES ---
    { name: "module_create", description: "Créer un module" },
    { name: "module_read", description: "Voir les modules" },
    { name: "module_update", description: "Modifier un module" },
    { name: "module_delete", description: "Supprimer un module" },

    // --- COURS ---
    { name: "cours_create", description: "Créer un cours" },
    { name: "cours_read", description: "Voir les cours" },
    { name: "cours_update", description: "Modifier un cours" },
    { name: "cours_delete", description: "Supprimer un cours" },

    // --- ENSEIGNANTS ---
    { name: "enseignant_create", description: "Créer un enseignant" },
    { name: "enseignant_read", description: "Voir les enseignants" },
    { name: "enseignant_update", description: "Modifier un enseignant" },
    { name: "enseignant_delete", description: "Supprimer un enseignant" },

    // --- ETUDIANTS ---
    { name: "etudiant_create", description: "Créer un étudiant" },
    { name: "etudiant_read", description: "Voir les étudiants" },
    { name: "etudiant_update", description: "Modifier un étudiant" },
    { name: "etudiant_delete", description: "Supprimer un étudiant" },

    // --- CANDIDATS ---
    { name: "candidat_read", description: "Voir les candidats" },
    {
      name: "candidat_validate",
      description: "Valider ou refuser un candidat",
    },

    // --- SALLES ---
    { name: "salle_create", description: "Créer une salle" },
    { name: "salle_read", description: "Voir les salles" },
    { name: "salle_update", description: "Modifier une salle" },
    { name: "salle_delete", description: "Supprimer une salle" },

    // --- PLANNING ---
    { name: "planning_create", description: "Créer un planning" },
    { name: "planning_read", description: "Voir le planning" },
    { name: "planning_update", description: "Modifier le planning" },
    { name: "planning_delete", description: "Supprimer un planning" },

    // --- ABSENCES ---
    { name: "absence_create", description: "Créer une absence" },
    { name: "absence_read", description: "Voir les absences" },
    { name: "absence_update", description: "Modifier une absence" },
    { name: "absence_delete", description: "Supprimer une absence" },

    // --- NOTES ---
    { name: "note_create", description: "Ajouter une note" },
    { name: "note_read", description: "Voir les notes" },
    { name: "note_update", description: "Modifier une note" },
    { name: "note_delete", description: "Supprimer une note" },

    // --- EVENTS ---
    { name: "event_create", description: "Créer un événement" },
    { name: "event_read", description: "Voir les événements" },
    { name: "event_update", description: "Modifier un événement" },
    { name: "event_delete", description: "Supprimer un événement" },

    // --- OPPORTUNITIES ---
    { name: "opportunite_create", description: "Créer une opportunité" },
    { name: "opportunite_read", description: "Voir les opportunités" },
    { name: "opportunite_update", description: "Modifier une opportunité" },
    { name: "opportunite_delete", description: "Supprimer une opportunité" },

    // --- RESSOURCES ---
    { name: "media_upload", description: "Uploader un fichier" },
    { name: "media_delete", description: "Supprimer un fichier" },

    // --- ADMIN ---
    { name: "admin_full_access", description: "Tous les droits du système" },
  ];

  // Insert All Permissions
  await Promise.all(
    permissions.map((p) =>
      prisma.permission.upsert({
        where: { name: p.name },
        update: {},
        create: {
          name: p.name,
          description: p.description,
        },
      })
    )
  );

  console.log("✅ Permissions seeded");
};
