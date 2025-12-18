import { Router } from "express";
import {
  createEnseignantController,
  getEnseignantController,
  updateEnseignantController,
  deleteEnseignantController,
  getAllEnseignantsController,
} from "./enseignantController";

const router = Router();

router.get("/enseignants", getAllEnseignantsController);
router.get("/enseignants/:id", getEnseignantController);
router.post("/enseignants", createEnseignantController);
router.put("/enseignants/:id", updateEnseignantController);
router.delete("/enseignants", deleteEnseignantController);

export default router;
