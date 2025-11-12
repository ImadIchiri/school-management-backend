import prisma from "../../config/prisma";
import { CreateRoleType, UpdateRoleType } from "./roleTypes";

// Get All Roles
export const getAllRoles = () => {
  return prisma.role.findMany({
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

// Get Role By Id
export const getRoleById = (roleId: number) => {
  return prisma.role.findUnique({
    where: { id: roleId, isDeleted: false },
    omit: {
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      isDeleted: true,
    },
  });
};

// Create New Role
export const createRole = (role: CreateRoleType) => {
  return prisma.role.create({
    data: {
      name: role.name,
      description: role?.description || "",
    },
    omit: {
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      isDeleted: true,
    },
  });
};

// Create Role With List Of Permissions
// export const createRoleWithPermissions = ({role, permissions}: {role: CreateRoleType, permissions: PermisionType[]}) => {}

/* 
    Update a Role 
    Body ==> role: { id, name, description }
 */
export const updateRole = (role: UpdateRoleType) => {
  return prisma.role.update({
    where: { id: role.id },
    data: {
      name: role.name,
      description: role?.description || "",
    },
    omit: {
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      isDeleted: true,
    },
  });
};

// Delete A Role
export const deleteRole = (roleId: number) => {
  return prisma.role.update({
    where: { id: roleId },
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
