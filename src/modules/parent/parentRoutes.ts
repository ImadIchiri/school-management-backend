import { Router } from "express";
import {
  createParentController,
  getParentController,
  updateParentController,
  deleteParentController,
  getAllParentsController,
} from "./parentController";

const router = Router();

router.post("/", createParentController);
router.get("/", getAllParentsController);
router.get("/:id", getParentController);
router.put("/:id", updateParentController);
router.delete("/:id", deleteParentController);

export default router;
