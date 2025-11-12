import prisma from "../../config/prisma";
import { CreatePermisionType, UpdatePermissionType } from "./permissionTypes";

// Get All Permissions
export const getAllPermissions = () => {
  return prisma.permission.findMany({
    where: {
      isDeleted: false,
    },
    omit: {
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      isDeleted: true,
    },
  });
};

// Get Permission By Id
export const getPermissionById = (permissionId: number) => {
  return prisma.permission.findUnique({
    where: { id: permissionId, isDeleted: false },
    omit: {
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      isDeleted: true,
    },
  });
};

// Create New Permission permission: { name: string, description: string }
export const createPermission = (permission: CreatePermisionType) => {
  return prisma.permission.create({
    data: {
      name: permission.name,
      description: permission?.description || "",
    },
    omit: {
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      isDeleted: true,
    },
  });
};

/* 
    Update a Permission 
    Body ==> permission: { id: number, name: string, description: string }
 */
export const updatePermission = (permission: UpdatePermissionType) => {
  return prisma.permission.update({
    where: { id: permission.id },
    data: {
      name: permission.name,
      description: permission?.description || "",
    },
    omit: {
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      isDeleted: true,
    },
  });
};

// Delete A Permission
export const deletePermission = (permissionId: number) => {
  return prisma.permission.update({
    where: { id: permissionId },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
    omit: {
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      isDeleted: true,
    },
  });
};
