import { Router } from "express";
import {
  createEnseignantController,
  getEnseignantController,
  updateEnseignantController,
  deleteEnseignantController,
  getAllEnseignantsController,
} from "./enseignantController";

const router = Router();

router.post("/", createEnseignantController);
router.get("/", getAllEnseignantsController);
router.get("/:id", getEnseignantController);
router.put("/:id", updateEnseignantController);
router.delete("/:id", deleteEnseignantController);

export default router;
