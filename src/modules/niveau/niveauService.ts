import prisma from "../../config/prisma"
import type { NiveauCreate, NiveauUpdate } from "./niveauTypes";


  // Créer un niveauFG 
  export const createNiveau= async (data: NiveauCreate) => {
    return await prisma.niveauScolaire.create({ data });
  }

  // Lister tous les niveaux
  export const getAllNiveaux = async()=> {
    return await prisma.niveauScolaire.findMany({
      include: { filiere: true, groupes: true } // inclure filiere et groupes
    });
  }

  // Récupérer un niveau par ID
  export const getNiveauById=async (id: number)=> {
    return await prisma.niveauScolaire.findUnique({
      where: { id },
      include: { filiere: true, groupes: true }
    });
  }

  // Mettre à jour un niveau 
  export const updateNiveau = async (id: number, data: NiveauUpdate) => {
    return await prisma.niveauScolaire.update({
      where: { id },
      data
    });
  }

  // Supprimer un niveau 
 export const deleteNiveau = async(id: number) => {
    return await prisma.niveauScolaire.delete({ where: { id } });
  }

  // Lister les groupes d'un niveau 
  export const getGroupesByNiveau = async (id: number) => {
    return await prisma.groupe.findMany({
      where: { niveauId: id }
    });
  }

