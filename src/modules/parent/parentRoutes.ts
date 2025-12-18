import { Router } from "express";
import {
  createParentController,
  getParentController,
  updateParentController,
  deleteParentController,
  getAllParentsController,
} from "./parentController";

const router = Router();

router.get("/parents", getAllParentsController);
router.get("/parents/:id", getParentController);
router.post("/parents", createParentController);
router.put("/parents/:id", updateParentController);
router.delete("/parents", deleteParentController);

export default router;
