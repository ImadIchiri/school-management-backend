import { Router } from "express";
import * as roleController from "./roleController";

const roleRoutes = Router();

// Get All Roles
roleRoutes.get("/roles", roleController.getAllRoles);

// Get Role By Id
roleRoutes.get("/roles/:roleId", roleController.getRoleById);

// Create New Role
roleRoutes.post("/roles", roleController.createRole);

// Update Role
roleRoutes.put("/roles/:roleId", roleController.updateRole);

// Delete Role
roleRoutes.delete("/roles/:roleId", roleController.deleteRole);

export default roleRoutes;
