import { PrismaClient } from "../../generated/prisma/client";
import type { ExistingCandidat, NewCandidat } from "./candidatTypes";

const prisma = new PrismaClient();

export const getAllCandidats = async () => {
  return await prisma.candidat.findMany({
    where: { isDeleted: false },
  });
};

export const getCandidatById = async (id: number) => {
  return await prisma.candidat.findUnique({
    where: { idCandidature: id },
  });
};

export const createCandidat = async (data: NewCandidat) => {
  return await prisma.candidat.create({
    data: { 
      ...data,
      dateCandidature: new Date(),
    }
    });
};

export const updateCandidat = async (id: number, data: ExistingCandidat) => {
  return await prisma.candidat.update({
    where: { idCandidature: id },
    data,
  });
};

export const deleteCandidat = async (id: number) => {
  return await prisma.candidat.update({
    where: { idCandidature: id },
    data: { isDeleted: true },
  });
};
