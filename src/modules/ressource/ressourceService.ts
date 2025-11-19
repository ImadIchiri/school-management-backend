import prisma from "../../config/prisma";
import type { RessourceCreate, RessourceUpdate,ressource } from "./ressourceTypes";

/**
 * Créer une ressource
 */
export const createRessource = async (data: RessourceCreate) => {
  return await prisma.ressource.create({ data });
};

/**
 * Récupérer toutes les ressources
 */
export const getAllRessources = async () => {
  return await prisma.ressource.findMany({
    include: { type: true, uploadedBy: true },
  });
};

/**
 * Récupérer une ressource par ID
 */
export const getRessourceById = async (id: number) => {
  return await prisma.ressource.findUnique({
    where: { id },
    include: { type: true, uploadedBy: true },
  });
};

/**
 * Mettre à jour une ressource
 */
export const updateRessource = async (id: number, data: RessourceUpdate) => {
  return await prisma.ressource.update({
    where: { id },
    data,
  });
};

// /**
//  * Supprimer une ressource (soft delete)
//  */
// export const deleteRessource = async (id: number) => {
//   return await prisma.ressource.update({
//     where: { id },
//     data: { isDeleted: true, deletedAt: new Date() },
//   });
// };
export const deleteRessource = async (id: number) => {
  return await prisma.ressource.delete({
    where: { id },
  });
};

