import prisma from "../../config/prisma";
import type { IEtudiant } from "./etudiantTypes";

// Créer un étudiant
export const createEtudiant = async (etudiantParam: {
  matricule: string;
  userId: number;
  groupeId: number;
  filiereId: number;
  dateInscription: Date;
}) => {
  try {
    const etudiantCree = await prisma.etudiant.create({
      data: etudiantParam,
    });
    return etudiantCree;
  } catch (error) {
    console.error("Erreur dans le service createEtudiant :", error);
    throw error;
  }
};

// Récupérer un étudiant par ID avec relations
export const getEtudiantById = async (id: number) => {
  return prisma.etudiant.findUnique({
    where: { idEtudiant: id },
    include: {
      filiere: true,
      groupe: true,
      user: true,
    },
  });
};

// Mettre à jour un étudiant
export const updateEtudiant = async (id: number, data: Partial<IEtudiant>) => {
  return prisma.etudiant.update({
    where: { idEtudiant: id },
    data,
  });
};

// Supprimer (soft delete)
export const deleteEtudiant = async (id: number) => {
  return prisma.etudiant.update({
    where: { idEtudiant: id },
    data: { isDeleted: true, deletedAt: new Date() },
  });
};

// Récupérer tous les étudiants (non supprimés)
export const getAllEtudiants = async () => {
  return prisma.etudiant.findMany({
    where: { isDeleted: false },
    include: {
      filiere: true,
      groupe: true,
      user: true,
    },
  });
};

// Étudiants par filière
export const getEtudiantsByFiliere = async (idFiliere: number) => {
  return await prisma.etudiant.findMany({
    where: {
      groupe: {
        niveau: {
          filiereId: idFiliere,
        },
      },
    },
    include: {
      groupe: {
        include: {
          niveau: {
            include: {
              filiere: true,
            },
          },
        },
      },
    },
  });
};

// Étudiants par niveau
export const getEtudiantsByNiveau = async (niveauId: number) => {
  return prisma.etudiant.findMany({
    where: {
      groupe: { niveauId },
      isDeleted: false,
    },
    include: {
      filiere: true,
      groupe: true,
      user: true,
    },
  });
};

// Étudiants par groupe
export const getEtudiantsByGroupe = async (idGroupe: number) => {
  return await prisma.etudiant.findMany({
    where: { groupeId: idGroupe },
    include: {
      groupe: {
        include: {
          niveau: {
            include: {
              filiere: true,
            },
          },
        },
      },
    },
  });
};
