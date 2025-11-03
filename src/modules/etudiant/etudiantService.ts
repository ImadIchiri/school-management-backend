import { PrismaClient } from "../../generated/prisma/client";
import type { IEtudiant } from "./etudiantTypes";
// Services Etudiant
const prisma = new PrismaClient();

export const createEtudiant = async (etudiant: IEtudiant) => {
  return prisma.etudiant.create({ data: etudiant });
};

export const getEtudiantById = async (id: number) => {
  return prisma.etudiant.findUnique({ where: { idEtudiant: id } });
};

export const updateEtudiant = async (id: number, data: Partial<IEtudiant>) => {
  return prisma.etudiant.update({ where: { idEtudiant: id }, data });
};

export const deleteEtudiant = async (id: number) => {
  return prisma.etudiant.update({
    where: { idEtudiant: id },
    data: { isDeleted: true },
  });
};

export const getAllEtudiants = async () => {
  return prisma.etudiant.findMany({ where: { isDeleted: false } });
};
