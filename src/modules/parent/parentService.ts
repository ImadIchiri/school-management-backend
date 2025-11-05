import { PrismaClient } from "../../generated/prisma/client";
import type { IParent } from "./parentTypes";

const prisma = new PrismaClient();

export const createParent = async (parent: IParent) => {
  return prisma.parent.create({
    data: {
      user: { connect: { id: parent.userId } },
    },
  });
};

export const getParentById = async (id: number) => {
  return prisma.parent.findUnique({ where: { idParent: id } });
};
//
export const updateParent = async (id: number, userObject: Partial<IParent>) => {
  return prisma.parent.update({ where: { idParent: id }, data: {} });
};

export const deleteParent = async (id: number) => {
  return prisma.parent.update({
    where: { idParent: id },
    data: { isDeleted: true },
  });
};

export const getAllParents = async () => {
  return prisma.parent.findMany({ where: { isDeleted: false } });
};
