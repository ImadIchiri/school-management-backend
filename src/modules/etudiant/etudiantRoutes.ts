import { Router } from "express";
import * as etudiantController from "./etudiantController";
// Routes etudiant
const router = Router();

router.get("/etudiants", etudiantController.getAllEtudiantsController);
router.get("/etudiants/:etudiantId", etudiantController.getEtudiantController);
router.post("/etudiants", etudiantController.createEtudiantController);
router.put(
  "/etudiants/:etudiantId",
  etudiantController.updateEtudiantController
);
router.delete("/etudiants", etudiantController.deleteEtudiantController);

export default router;
