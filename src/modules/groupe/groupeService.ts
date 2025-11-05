import prisma from "../../config/prisma"

import type { GroupeCreate, GroupeUpdate } from "groupeTypes";



  // Créer un groupe
  export const createGroupe = async(data: GroupeCreate) => {
    return await prisma.groupe.create({ data });
  }

  // Lister tous les groupes
  export const getAllGroupes = async() => {
    
    return await prisma.groupe.findMany({
      include: { niveau: true } // inclure info du niveau associé
    });
  }

  // Récupérer un groupe par ID
  export const  getGroupeById = async(id: number) => {
    return await prisma.groupe.findUnique({
      where: { id },
      include: { niveau: true }
    });
  }

  // Mettre à jour un groupe
  export const updateGroupe = async(id: number, data: GroupeUpdate) => {
    return await prisma.groupe.update({
      where: { id },
      data
    });
  }

  // Supprimer un groupe
  export const deleteGroupe = async(id: number) => {
    return await prisma.groupe.delete({ where: { id } });
  }

  // Lister les étudiants d’un groupe
  export const getEtudiantsByGroupe = async (id: number)  => {
    return await prisma.etudiant.findMany({
      where: { groupeId: id },
      include: { groupe: true, filiere: true }
    });
  }

