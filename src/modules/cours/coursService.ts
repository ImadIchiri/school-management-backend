import prisma from "../../config/prisma.js";
import type { coursType } from "./coursTypes.js";

// Récupérer tous les cours
export const getAllCours = async (): Promise<coursType[]> => {
  return prisma.cours.findMany({
    where: { isDeleted: false },
    include: {
      module: true,
      enseignant: true,
      salle: true,
      plannings: true,
      ressources: {
        select: {
          ressource: true,
        },
      },
      absences: true,
    },
  });
};

// Récupérer un cours par ID
export const getCoursById = async (id: number): Promise<coursType | null> => {
  return prisma.cours.findUnique({
    where: { id },
    include: {
      module: true,
      enseignant: true,
      salle: true,
      plannings: true,
      ressources: {
        select: { ressource: true },
      },
      absences: true,
    },
  });
};

// Créer un cours
export const createCours = async (data: Omit<coursType, "id" | "module" | "enseignant" | "salle" | "plannings" | "ressources" | "absences" | "createdAt" | "updatedAt" | "isDeleted">): Promise<coursType> => {
  return prisma.cours.create({
    data,
    include: {
      module: true,
      enseignant: true,
      salle: true,
      plannings: true,
      ressources: {
        select: { ressource: true },
      },
      absences: true,
    },
  });
};

// Mettre à jour un cours
export const updateCours = async (data: Omit<coursType, "module" | "enseignant" | "salle" | "plannings" | "ressources" | "absences" | "createdAt" | "updatedAt" | "isDeleted"> & { id: number }): Promise<coursType> => {
  return prisma.cours.update({
    where: { id: data.id },
    data,
    include: {
      module: true,
      enseignant: true,
      salle: true,
      plannings: true,
      ressources: {
        select: { ressource: true },
      },
      absences: true,
    },
  });
};

// Supprimer un cours (soft delete)
export const deleteCours = async (id: number): Promise<coursType> => {
  return prisma.cours.update({
    where: { id },
    data: { isDeleted: true },
    include: {
      module: true,
      enseignant: true,
      salle: true,
      plannings: true,
      ressources: {
        select: { ressource: true },
      },
      absences: true,
    },
  });
};
