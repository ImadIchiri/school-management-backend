import prisma from "../../config/prisma";
import type {moduleCreate,moduleUpdate} from "./moduleTypes";
/**
 * Créer un module
 */
export const createModule = async (data:moduleCreate) => {
  return await prisma.module.create({ data });
};

/**
 * Récupérer tous les modules
 */
export const getAllModules = async () => {
  return await prisma.module.findMany({
    include:{niveau:true,
      cours:true,
      examens:true,
      enseignants:true,
    }
  });
};

/**
 * Récupérer un module par ID
 */
export const getModuleById = async (id: number) => {
  return await prisma.module.findUnique({
     where: { id },
     include:{niveau:true,
      cours:true,
      examens:true,
      enseignants:true,
     } 
    });
};

/**
 * Mettre à jour un module
 */
export const updateModule = async (id: number,data:moduleUpdate) => {
  return await prisma.module.update({
    where: { id },
    data
  });
};

/**
 * Supprimer un module
 */
export const deleteModule = async (id: number) => {
  return await prisma.module.delete({
    where: { id },
  });
}
