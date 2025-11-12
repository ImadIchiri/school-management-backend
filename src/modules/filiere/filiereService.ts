import prisma from "../../config/prisma"



 export const createFiliere = async (data: { nom: string; description: string }) => {
    return await prisma.filiere.create({ data });
  }

  export const getAllFilieres= async()=> {
    return await prisma.filiere.findMany();
  }

  export const getFiliereById = async (id: number) => {
    return await prisma.filiere.findUnique({ where: { id } });
  }

  export const  updateFiliere = async(id: number, data: { nom?: string; description?: string }) => {
    return await prisma.filiere.update({ where: { id }, data });
  }

  export const  deleteFiliere = async(id: number) => {
    return await prisma.filiere.delete({ where: { id } });
  }

  export const  getEtudiantsByFiliere = async (id: number) => {
    return await prisma.etudiant.findMany({
      where: { filiereId: id },
      include: { filiere: true },
    });
  }

