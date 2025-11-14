import prisma from "../../config/prisma";
import type { ExistingUser, NewUser, NewUserWithId } from "./userTypes";

export const getAllUsers = () => {
  return prisma.user.findMany({
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
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: true,
      candidat: true,
      etudiant: true,
      employe: true,
      parent: true,
    },
  });

  if (!user || user.isDeleted) {
    throw new Error("Utilisateur introuvable");
  }

  return user as ExistingUser;
};

export const createUser = async (user: NewUser): Promise<ExistingUser> => {
  return await prisma.user.create({ data: user as any });
};

export const updateUser = async (
  user: NewUserWithId
): Promise<ExistingUser> => {
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
      deletedAt: new Date(),
    },
  });
};

export const getUserByEmail = (email: any): Promise<ExistingUser | null> => {
  return prisma.user.findUnique({ where: email });
};
