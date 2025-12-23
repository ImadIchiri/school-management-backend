import prisma from "../../config/prisma";
import bcrypt from "bcrypt";
import type { ExistingCandidat, NewCandidat } from "./candidatTypes";

interface CreateCandidatInput {
  nom: string;
  prenom: string;
  dateNaissance: Date | string;
  adresse: string;
  telephone: string;
  email: string;
  password: string;
  filiere: string;
  niveau: any;
}

/* =================== CREATE USER + CANDIDAT =================== */
export const createUserAndCandidat = async (
  data: CreateCandidatInput
): Promise<ExistingCandidat> => {
  return prisma.$transaction(async (tx) => {
    // Vérifier email unique
    const existingUser = await tx.user.findUnique({ where: { email: data.email } });
    if (existingUser) throw new Error("Email déjà utilisé.");

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Créer l'utilisateur
    const user = await tx.user.create({
      data: {
        nom: data.nom,
        prenom: data.prenom,
        dateNaissance: new Date(data.dateNaissance),
        adresse: data.adresse,
        telephone: data.telephone,
        email: data.email,
        password: hashedPassword,
      },
    });

    // Créer le candidat lié
    const candidat = await tx.candidat.create({
      data: {
        userId: user.id,
        filiere: data.filiere,
        niveau: data.niveau,
        etat: "en_attente",
        dateCandidature: new Date(),
      },
      include: {
        user: true, // inclure les infos de l'utilisateur
      },
    });

    return candidat;
  });
};

/* =================== GET ALL CANDIDATS =================== */
export const getAllCandidats = async () => {
  return await prisma.candidat.findMany({
    where: { isDeleted: false },
    include: { user: true }, // inclure les infos user
  });
};

/* =================== GET CANDIDAT BY ID =================== */
export const getCandidatById = async (id: number) => {
  return await prisma.candidat.findUnique({
    where: { idCandidature: id },
    include: { user: true }, // inclure les infos user
  });
};

/* =================== CREATE CANDIDAT SIMPLE =================== */
export const createCandidat = async (data: NewCandidat): Promise<ExistingCandidat> => {
  return await prisma.candidat.create({
    data: {
      ...data,
      dateCandidature: new Date(),
    },
    include: { user: true },
  });
};

/* =================== UPDATE CANDIDAT =================== */

export const updateCandidat = async (
  id: number,
  data: Partial<{ etat: "en_attente" | "en_cours" | "accepte" | "refuse" | "incomplet" }>
) => {
  return await prisma.candidat.update({
    where: { idCandidature: id },
    data: { ...data },
    include: { user: true },
  });
};


/* =================== DELETE CANDIDAT =================== */
export const deleteCandidat = async (id: number) => {
  return await prisma.candidat.update({
    where: { idCandidature: id },
    data: { isDeleted: true },
    include: { user: true },
  });
};
