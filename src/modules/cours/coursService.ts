import prisma from "../../config/prisma";
import type { coursCreate,coursUpdate } from "./coursTypes";

// Récupérer tous les cours
export const getAllCours = async ()=> {
  return await prisma.cours.findMany({
    include: {
      module: true,
      enseignant: true,
      salle: true,
      plannings: true,
      ressources:true,
      absences:true}
  });
};

// Récupérer un cours par ID
export const getCoursById = async (id: number)=> {
  return await prisma.cours.findUnique({
    where: { id },
    include: {
      module: true,
      enseignant: true,
      salle: true,
      plannings: true,
      ressources: true,
      absences: true,
    },
  });
};

// Créer un cours
export const createCours = async (data:coursCreate)=> {
  return await prisma.cours.create({
    data,
    include: {
      module: true,
      enseignant: true,
      salle: true,
      plannings: true,
      ressources: true,
      absences: true,
    },
  });
};

// Mettre à jour un cours
export const updateCours = async (id:number,data:coursUpdate)=> {
  return await prisma.cours.update({
    where: { id},
    data,
    include: {
      module: true,
      enseignant: true,
      salle: true,
      plannings: true,
      ressources: true,
      absences: true,
    },
  });
};

// Supprimer un cours (soft delete)
export const deleteCours = async (id: number)=> {
  return await prisma.cours.delete({
    where: { id },
  });
}
