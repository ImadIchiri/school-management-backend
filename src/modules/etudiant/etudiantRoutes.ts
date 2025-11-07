import { Router } from "express";
import * as etudiantController from "./etudiantController";
// Routes etudiant
const router = Router();

router.post("/", etudiantController.createEtudiant);
router.get("/", etudiantController.getAllEtudiants);
router.get("/:id", etudiantController.getEtudiantById);
router.put("/:id", etudiantController.updateEtudiant);
router.delete("/:id", etudiantController.deleteEtudiant);

export default router;
