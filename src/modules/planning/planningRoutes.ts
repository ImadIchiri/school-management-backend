import { Router } from "express";
import * as planningController from "./planningController";

const planningRoutes = Router();

// Get All Plannings
planningRoutes.get("/plannings", planningController.getAllPlannings);

// Get Planning By Id
planningRoutes.get("/plannings/:planningId", planningController.getPlanningById);

// Create New Planning
planningRoutes.post("/plannings", planningController.createPlanning);

// Update Planning
planningRoutes.put("/plannings/:planningId", planningController.updatePlanning);

// Delete Planning
planningRoutes.delete("/plannings/:planningId", planningController.deletePlanning);

export default planningRoutes;
