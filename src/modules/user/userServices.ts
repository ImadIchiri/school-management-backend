import prisma from "../../config/prisma";
import type { ExistingUser, NewUser } from "./userTypes";

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    where: { isDeleted: false },
    include: {
      role: true,
      candidat: true,
      etudiant: true,
      employe: true,
      parent: true,
    },
    omit: { isDeleted: true },
  });
};

export const getUserById = async (userId: number): Promise<ExistingUser> => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
      isDeleted: false,
    },
    include: {
      role: true,
      candidat: true,
      etudiant: true,
      employe: true,
      parent: true,
    },
    omit: { isDeleted: true },
  } as any);
};

export const createUser = async (user: NewUser): Promise<ExistingUser> => {
  return await prisma.user.create({ data: user as any });
};

export const updateUser = async (user: ExistingUser): Promise<ExistingUser> => {
  const updateData: any = {
    nom: user.nom,
    prenom: user.prenom,
    dateNaissance: user.dateNaissance,
    adresse: user.adresse,
    telephone: user.telephone,
    email: user.email,
    password: user.password,
  };

  if (user.roleId !== undefined) {
    updateData.roleId = user.roleId; // ajoute seulement si défini
  }

  return await prisma.user.update({
    where: { id: user.id },
    data: updateData,
  });
};


export const deleteUser = async (user: ExistingUser): Promise<ExistingUser> => {
  return await prisma.user.update({
    where: { id: user.id },
    data: {
      isDeleted: true,
      // deletedAt: new Date(), // if you track deletedAt, ensure field in model
    } as any,
  });
};
