import type { Request, Response } from "express";
import * as userService from "./userService";
import type { ExistingUser, NewUserWithId } from "./userTypes";
import prisma from "../../config/prisma";

/* Get All Users */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: ExistingUser[] = await userService.getAllUsers();

    return res.status(200).json({
      success: true,
      data: users,
      length: users.length,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
      error: error,
    });
  }
};

/* 
    Get User By Id 
    params: { userId: Int }
*/
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId: string | undefined = req.params.userId;

    if (userId === undefined) {
      return res.status(404).json({
        success: false,
        message: `Id is Not a Number !`,
      });
    }

    const user: ExistingUser | null = await userService.getUserById(
      parseInt(userId)
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No user found for the Id: ${userId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error Getting User",
    });
  }
};

/* 
  Create New User 
  body; { nom, prenom, dateNaissance, adresse, telephone, email, password, roleId, }
*/
export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      nom,
      prenom,
      dateNaissance,
      adresse,
      telephone,
      email,
      password,
      roleId,
    } = req.body;

    // Check if role exists
    if (roleId) {
      const role = await prisma.role.findUnique({ where: { id: roleId } });
      if (!role) {
        return res.status(404).json({
          success: false,
          message: `No Role Found With Id ${roleId}`,
        });
      }
    }

    const user: ExistingUser = await userService.createUser({
      nom,
      prenom,
      dateNaissance,
      adresse,
      telephone,
      email,
      password,
      roleId,
    });

    return res.status(201).json({
      success: true,
      data: user,
      message: `User created successfully`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error While Creating User",
      error: error,
    });
  }
};

/* Update User 
  body; { userId, nom, prenom, dateNaissance, adresse, telephone, email, password, roleId, }
*/
export const updateUser = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      nom,
      prenom,
      dateNaissance,
      adresse,
      telephone,
      email,
      password,
      roleId,
    } = req.body;

    const user: NewUserWithId | null = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No User Found With Id ${userId}`,
      });
    }

    const updatedUser = await userService.updateUser({
      ...user,
      nom,
      prenom,
      dateNaissance,
      adresse,
      telephone,
      email,
      password,
      roleId,
    });

    return res.status(200).json({
      success: true,
      message: `User Updated Successfully`,
      data: updatedUser,
    });
  } catch (error: any) {
    console.log(`Error While Updating User ${error}`);
    return res.status(500).json({
      success: false,
      message: `Error While Updating User`,
      error: error,
    });
  }
};

/* Delete User */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId }: { userId: number } = req.body;

    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No User Found With Id ${userId}`,
      });
    }

    const deletedUser = userService.deleteUser(user);

    return res.status(200).json({
      success: true,
      message: `User deleted Successfully`,
      data: deletedUser,
    });
  } catch (error) {
    // console.log(`Error while deleting User ${error}`);
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Error While Deleting User`,
      error: error,
    });
  }
};
