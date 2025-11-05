import { Router } from "express";
import {
  createEtudiantController,
  getEtudiantController,
  updateEtudiantController,
  deleteEtudiantController,
  getAllEtudiantsController,
} from "./etudiantController";
// Routes etudiant
const router = Router();

router.post("/", createEtudiantController);
router.get("/", getAllEtudiantsController);
router.get("/:id", getEtudiantController);
router.put("/:id", updateEtudiantController);
router.delete("/:id", deleteEtudiantController);

export default router;
