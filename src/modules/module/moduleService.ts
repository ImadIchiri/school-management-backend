import prisma from "../../config/prisma.js";
import type { moduleType} from "./moduleTypes.js";

export const getAllModules = async (): Promise<moduleType[]> => {
  return prisma.module.findMany({
    where: { isDeleted: false },
    select: {
      id: true,
      nom: true,
      description: true,
      niveauId: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
      enseignants: {
        select: {
          id: true,
          enseignantId: true,
          dateAffectation: true,
        },
      },
    },
    orderBy: { id: "asc" },
  });
};

export const getModuleById = (id: number): Promise<moduleType | null> => {
  return prisma.module.findUnique({
    where: { id },
    select: {
      id: true,
      nom: true,
      description: true,
      niveauId: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
      enseignants: {
        select: {
          id: true,
          enseignantId: true,
          dateAffectation: true,
        },
      },
    },
  });
};

export const createModule = (
  data: Omit<moduleType, "id" | "enseignants" | "createdAt" | "updatedAt" | "isDeleted">
): Promise<moduleType> => {
  return prisma.module.create({
    data,
    select: {
      id: true,
      nom: true,
      description: true,
      niveauId: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
      enseignants: {
        select: {
          id: true,
          enseignantId: true,
          dateAffectation: true,
        },
      },
    },
  });
};


export const updateModule = async (
  module: Omit<moduleType, "enseignants" | "createdAt" | "updatedAt" | "isDeleted"> & { id: number }
): Promise<moduleType> => {
  return prisma.module.update({
    where: { id: module.id },
    data: {
      nom: module.nom,
      description: module.description,
      niveauId: module.niveauId,
    },
    select: {
      id: true,
      nom: true,
      description: true,
      niveauId: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
      enseignants: {
        select: {
          id: true,
          enseignantId: true,
          dateAffectation: true,
        },
      },
    },
  });
};

export const deleteModule = (module: { id: number }): Promise<moduleType> => {
  return prisma.module.update({
    where: { id: module.id },
    data: { isDeleted: true },
    select: {
      id: true,
      nom: true,
      description: true,
      niveauId: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
      enseignants: {
        select: {
          id: true,
          enseignantId: true,
          dateAffectation: true,
        },
      },
    },
  });
};



















// // Get All modules
// export const getAllModules = async ():Promise<moduleType[]>=> {
//   return prisma.module.findMany({
//     where: { isDeleted: false },
//     include: { cours: true },
//     omit:{
//       isDeleted:true,
//       createdAt:true,
//       updatedAt:true,
//     }
//   });
// };

// // Get module by ID
// export const getModuleById =(id: number): Promise<moduleType | null>=> {
//   return prisma.module.findUnique({
//     where: {
//       id
//     },
//     include: {
//       cours: true 
//     },
//     omit: {
//       isDeleted: true,
//       createdAt:true,
//       updatedAt:true,
//     },
//   });
// };

// // Create Module
// export const createModule =(data:Omit<moduleType,"id"|"cours">):Promise<moduleType> => {
//   return prisma.module.create({
//     data,
//   });
// };

// // Update Module
// export const updateModule = async (module:Omit<moduleType,"cours">&{id:number}):Promise<moduleType> => {
//    return await prisma.module.update({
//     where: { id: module.id },
//     data: {
//       nom: module.nom,
//       description: module.description,
//       niveauId: module.niveauId,
//     },
//   });
// };

// // Delete Module
// export const deleteModule = (module:{id:number}):Promise<moduleType> => {
//   return prisma.module.update({
//     where: { id: module.id },
//     data: { 
//       isDeleted: true,
//     },
//   });
// };
// // Get Module By Cours

// export const getModuleByCours = async(coursId:number):Promise<moduleType>=> {
//   const cours=await prisma.cours.findUnique({
//     where: { 
//       id:coursId,
//     },
//     include: { 
//       module: true 
//     },
//   });
//   if (!cours || !cours.module) {
//     throw new Error(`Module pour le cours id=${coursId} non trouvé`);
//   }
//   return cours.module;
// };

