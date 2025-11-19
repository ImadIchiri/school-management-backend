import { Request, Response } from "express";
import * as roleService from "./roleService";

/* 
    Get All Roles
*/
export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRoles();

    return res.status(200).json({
      success: true,
      data: roles,
      length: roles.length,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
      error: error,
    });
  }
};

// Define specific type for params
type GetRoleByIdParams = {
  roleId: string | undefined;
};
/* 
    Get Role By Id
    Request Param: { roleId }
*/
export const getRoleById = async (
  req: Request<GetRoleByIdParams>,
  res: Response
) => {
  try {
    const { roleId } = req.params;

    if (roleId === undefined) {
      return res.status(400).json({
        success: false,
        message: `Invalid Id: ${roleId}`,
      });
    }

    const role = await roleService.getRoleById(parseInt(roleId));

    if (!role) {
      return res.status(404).json({
        success: false,
        message: `No role found for the Id: ${roleId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: role,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error Getting Role By Id",
    });
  }
};

/*
    Create New Role
    Request Body: { name: string, description string }
*/
export const createRole = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Create New Role
    const role = await roleService.createRole({
      name,
      description,
    });

    return res.status(201).json({
      success: true,
      data: role,
      message: `Role created successfully`,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error While Creating Role",
    });
  }
};

/*
    Update Role
    Request Body: { roleId: number, name: string, description string }
*/
export const updateRole = async (req: Request, res: Response) => {
  try {
    const { roleId: roleIdParams } = req.params;
    const { roleId: roleIdBody, name, description } = req.body;

    // Check if Ids are the same
    if (
      roleIdParams === undefined ||
      roleIdBody === undefined ||
      parseInt(roleIdParams) !== roleIdBody
    ) {
      return res.status(400).json({
        success: false,
        message: "Make sure Ids are valid numbers and are the same!",
      });
    }

    // Check If Role Exists
    const role = await roleService.getRoleById(roleIdBody);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: `No Role Foud With Id ${roleIdBody}`,
      });
    }

    // Update Role
    const updatedRole = await roleService.updateRole({
      id: roleIdBody,
      name,
      description,
    });

    return res.status(200).json({
      success: true,
      message: `Role Updated Successfully`,
      date: updatedRole,
    });
  } catch (error: any) {
    console.log(`Error While Updating Role ${error}`);
    return res.status(500).json({
      success: false,
      message: `Error While Updating Role`,
      error: error,
    });
  }
};

/*
    Delete Role
    Request Body: { roleId: Int }
*/
export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { roleId: roleIdParams } = req.params;
    const { roleId: roleIdBody }: { roleId: number | undefined } = req.body;

    // Check if Ids are the same
    if (
      roleIdParams === undefined ||
      roleIdBody === undefined ||
      parseInt(roleIdParams) !== roleIdBody
    ) {
      return res.status(400).json({
        success: false,
        message: "Make sure Ids are valid numbers and are the same!",
      });
    }

    // Check If Role Exists
    const role = await roleService.getRoleById(roleIdBody);
    if (!role) {
      return res.status(404).json({
        success: false,
        message: `No Role Foud With Id ${roleIdBody}`,
      });
    }

    // Delete the Role
    const deletedRole = await roleService.deleteRole(roleIdBody);

    return res.status(200).json({
      success: true,
      message: `Role deleted Successfylly`,
      data: deletedRole,
    });
  } catch (error) {
    console.log(`Error while deleting Role ${error}`);
    return res.status(500).json({
      success: false,
      message: `Error While Deleting Role`,
      error: error,
    });
  }
};
