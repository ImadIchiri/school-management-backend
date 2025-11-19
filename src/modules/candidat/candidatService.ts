import prisma from "../../config/prisma";
import type { ExistingCandidat, NewCandidat } from "./candidatTypes";

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

export const createCandidat = async (
  data: NewCandidat
): Promise<ExistingCandidat> => {
  return await prisma.candidat.create({
    data: {
      ...data,
      dateCandidature: new Date(),
    },
  });
};

export const updateCandidat = async (
  id: number,
  data: Partial<ExistingCandidat>
) => {
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
