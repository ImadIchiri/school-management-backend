import { Router } from "express";
import {
  createEmployeController,
  getAllEmployesController,
  getEmployeByIdController,
  updateEmployeController,
  deleteEmployeController,
} from "./employeController";

const router = Router();

router.post("/", createEmployeController);
router.get("/", getAllEmployesController);
router.get("/:id", getEmployeByIdController);
router.put("/:id", updateEmployeController);
router.delete("/:id", deleteEmployeController);

export default router;
