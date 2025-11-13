import { PrismaClient } from "../../generated/prisma/client";
import type { IEmploye } from "./employeTypes";

const prisma = new PrismaClient();

export const createEmploye = async (employe: IEmploye) => {
  return prisma.employe.create({ data: employe });
};

export const getEmployeById = async (id: number) => {
  return prisma.employe.findUnique({ where: { idEmploye: id } });
};

export const updateEmploye = async (id: number, data: Partial<IEmploye>) => {
  return prisma.employe.update({ where: { idEmploye: id }, data });
};

export const deleteEmploye = async (id: number) => {
  return prisma.employe.update({
    where: { idEmploye: id },
    data: { isDeleted: true },
  });
};

export const getAllEmployes = async () => {
  return prisma.employe.findMany({ where: { isDeleted: false } });
};
