import { PrismaClient } from "../../generated/prisma/client";
import type { IEtudiant } from "./etudiantTypes";
// Services Etudiant
const prisma = new PrismaClient();

export const createEtudiant = async (etudiant: IEtudiant) => {
  return prisma.etudiant.create({ data: etudiant });
};

export const getAllEtudiants = async () => {
  return prisma.etudiant.findMany({ where: { isDeleted: false } });
};

export const getEtudiantById = async (id: number) => {
  return prisma.etudiant.findUnique({
    where: { idEtudiant: id },
    include: {
      user: true, // récupère nom, prenom, email, etc.
      Candidat: {
        // seulement les candidats acceptés
        where: {
          isDeleted: false,
          etat: "accepte",
        },
      },
    },
  });
};

export const updateEtudiant = async (id: number, data: Partial<IEtudiant>) => {
  return prisma.etudiant.update({
    where: { idEtudiant: id },
    data: data,
  });
};

export const deleteEtudiant = async (id: number) => {
  return prisma.etudiant.update({
    where: { idEtudiant: id },
    data: { isDeleted: true, deletedAt: new Date() },
  });
};
