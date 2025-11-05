import { PrismaClient } from "../../generated/prisma/client";
import type { IEnseignant } from "./enseignantTypes";

const prisma = new PrismaClient();

export const createEnseignant = async (enseignant: IEnseignant) => {
  return prisma.enseignant.create({ data: enseignant });
};

export const getEnseignantById = async (id: number) => {
  return prisma.enseignant.findUnique({ where: { idEnseignant: id } });
};

export const updateEnseignant = async (
  id: number,
  data: Partial<IEnseignant>
) => {
  return prisma.enseignant.update({ where: { idEnseignant: id }, data });
};

export const deleteEnseignant = async (id: number) => {
  return prisma.enseignant.update({
    where: { idEnseignant: id },
    data: { isDeleted: true },
  });
};

export const getAllEnseignants = async () => {
  return prisma.enseignant.findMany({ where: { isDeleted: false } });
};
