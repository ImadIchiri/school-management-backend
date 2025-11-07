import prisma from "../../config/prisma.js";
import type { moduleType} from "./moduleTypes.js";

// Get All modules
export const getAllModules = async ():Promise<moduleType[]>=> {
  return prisma.module.findMany({
    where: { isDeleted: false },
    include: { cours: true },
    omit:{
      isDeleted:true,
      createdAt:true,
      updatedAt:true,
    }
  });
};

// Get module by ID
export const getModuleById =(id: number): Promise<moduleType | null>=> {
  return prisma.module.findUnique({
    where: {
      id
    },
    include: {
      cours: true 
    },
    omit: {
      isDeleted: true,
      createdAt:true,
      updatedAt:true,
    },
  });
};

// Create Module
export const createModule =(data:Omit<moduleType,"id"|"cours">):Promise<moduleType> => {
  return prisma.module.create({
    data,
  });
};

// Update Module
export const updateModule = async (module:Omit<moduleType,"cours">&{id:number}):Promise<moduleType> => {
   return await prisma.module.update({
    where: { id: module.id },
    data: {
      nom: module.nom,
      description: module.description,
      niveauId: module.niveauId,
    },
  });
};

// Delete Module
export const deleteModule = (module:{id:number}):Promise<moduleType> => {
  return prisma.module.update({
    where: { id: module.id },
    data: { 
      isDeleted: true,
    },
  });
};
// Get Module By Cours

export const getModuleByCours = async(coursId:number):Promise<moduleType>=> {
  const cours=await prisma.cours.findUnique({
    where: { 
      id:coursId,
    },
    include: { 
      module: true 
    },
  });
  if (!cours || !cours.module) {
    throw new Error(`Module pour le cours id=${coursId} non trouvé`);
  }
  return cours.module;
};

