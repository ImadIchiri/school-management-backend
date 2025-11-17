import { Router } from "express";
import * as etudiantController from "./etudiantController";
// Routes etudiant
const router = Router();

router.get("/etudiants", etudiantController.getAllEtudiants);
router.get("/etudiants/:etudiantId", etudiantController.getEtudiantById);
router.post("/etudiants", etudiantController.createEtudiant);
router.put("/etudiants/:etudiantId", etudiantController.updateEtudiant);
router.delete("/etudiants", etudiantController.deleteEtudiant);

export default router;
