import { Router } from "express";
import * as permissionController from "./permissionController";

const permissionRoutes = Router();

// Get All Permissions
permissionRoutes.get("/permissions", permissionController.getAllPermissions);

// Get Permission By Id
permissionRoutes.get(
  "/permissions/:permissionId",
  permissionController.getPermissionById
);

// Create New Permission
permissionRoutes.post("/permissions", permissionController.createPermission);

// Update Permission
permissionRoutes.put(
  "/permissions/:permissionId",
  permissionController.updatePermission
);

// Delete Permission
permissionRoutes.delete(
  "/permissions/:permissionId",
  permissionController.deletePermission
);

export default permissionRoutes;
