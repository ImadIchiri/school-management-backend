import { Request, Response } from "express";
import * as permissionService from "./permissionService";

/* 
    Get All Permissions
*/
export const getAllPermissions = async (req: Request, res: Response) => {
  try {
    const permissions = await permissionService.getAllPermissions();

    return res.status(200).json({
      success: true,
      data: permissions,
      length: permissions.length,
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
type GetPermissionByIdParams = {
  permissionId: string | undefined;
};
/* 
    Get Permission By Id
    Request Param: { permissionId }
*/
export const getPermissionById = async (
  req: Request<GetPermissionByIdParams>,
  res: Response
) => {
  try {
    const { permissionId } = req.params;

    if (permissionId === undefined) {
      return res.status(400).json({
        success: false,
        message: `Invalid Id: ${permissionId}`,
      });
    }

    const permission = await permissionService.getPermissionById(
      parseInt(permissionId)
    );

    if (!permission) {
      return res.status(404).json({
        success: false,
        message: `No permission found for the Id: ${permissionId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: permission,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error?.message || "Internal Server Error Getting Permission By Id",
    });
  }
};

/*
    Create New Permission
    Request Body: { name: string, description? string }
*/
export const createPermission = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    console.log({ name, description });

    // Create New Permission
    const permission = await permissionService.createPermission({
      name,
      description,
    });

    return res.status(201).json({
      success: true,
      data: permission,
      message: `Permission created successfully`,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error?.message || "Internal Server Error While Creating Permission",
    });
  }
};

/*
    Update Permission
    Request Body: { permissionId: number, name: string, description: string }
*/
export const updatePermission = async (req: Request, res: Response) => {
  try {
    const { permissionId: permissionIdParams } = req.params;
    const { permissionId: permissionIdBody, name, description } = req.body;

    // Check if Ids are the same
    if (
      permissionIdParams === undefined ||
      permissionIdBody === undefined ||
      parseInt(permissionIdParams) !== permissionIdBody
    ) {
      return res.status(400).json({
        success: false,
        message: "Make sure Ids are valid numbers and are the same!",
      });
    }

    // Check If Permission Exists
    const permission = await permissionService.getPermissionById(
      permissionIdBody
    );

    if (!permission) {
      return res.status(404).json({
        success: false,
        message: `No Permission Foud With Id ${permissionIdBody}`,
      });
    }

    // Update Permission
    const updatedPermission = await permissionService.updatePermission({
      id: permissionIdBody,
      name,
      description,
    });

    return res.status(200).json({
      success: true,
      message: `Permission Updated Successfully`,
      date: updatedPermission,
    });
  } catch (error: any) {
    console.log(`Error While Updating Permission ${error}`);
    return res.status(500).json({
      success: false,
      message: `Error While Updating Permission`,
      error: error,
    });
  }
};

/*
    Delete Permission
    Request Body: { permissionId: Int }
*/
export const deletePermission = async (req: Request, res: Response) => {
  try {
    const { permissionId: permissionIdParams } = req.params;
    const {
      permissionId: permissionIdBody,
    }: { permissionId: number | undefined } = req.body;

    // Check if Ids are the same
    if (
      permissionIdParams === undefined ||
      permissionIdBody === undefined ||
      parseInt(permissionIdParams) !== permissionIdBody
    ) {
      return res.status(400).json({
        success: false,
        message: "Make sure Ids are valid numbers and are the same!",
      });
    }

    // Check If Permission Exists
    const permission = await permissionService.getPermissionById(
      permissionIdBody
    );
    if (!permission) {
      return res.status(404).json({
        success: false,
        message: `No Permission Foud With Id ${permissionIdBody}`,
      });
    }

    // Delete the Permission
    const deletedPermission = await permissionService.deletePermission(
      permissionIdBody
    );

    return res.status(200).json({
      success: true,
      message: `Permission deleted Successfylly`,
      data: deletedPermission,
    });
  } catch (error) {
    console.log(`Error while deleting Permission ${error}`);
    return res.status(500).json({
      success: false,
      message: `Error While Deleting Permission`,
      error: error,
    });
  }
};
