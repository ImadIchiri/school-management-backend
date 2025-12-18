import { Router } from "express";
import {
  createEmployeController,
  getAllEmployesController,
  getEmployeByIdController,
  updateEmployeController,
  deleteEmployeController,
} from "./employeController";

const router = Router();

router.get("/employes", getAllEmployesController);
router.get("/employes/:id", getEmployeByIdController);
router.post("/employes", createEmployeController);
router.put("/employes/:id", updateEmployeController);
router.delete("/employes", deleteEmployeController);

export default router;
