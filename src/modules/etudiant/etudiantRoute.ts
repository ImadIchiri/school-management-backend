import { Router } from "express";
import {
  createEtudiantController,
  getEtudiantController,
  updateEtudiantController,
  deleteEtudiantController,
  getAllEtudiantsController,
  getEtudiantsByFiliereController,
  getEtudiantsByNiveauController,
  getEtudiantsByGroupeController,
  listEtudiantsByGroupe,
  listEtudiantsByFiliere,
} from "./etudiantController";

const router = Router();

// Routes classiques
router.post("/", createEtudiantController);
router.get("/", getAllEtudiantsController);
router.get("/:id", getEtudiantController);
router.put("/:id", updateEtudiantController);
router.delete("/:id", deleteEtudiantController);

// Routes relationnelles
router.get("/filiere/:filiereId", getEtudiantsByFiliereController);
router.get("/niveau/:niveauId", getEtudiantsByNiveauController);
router.get("/groupe/:groupeId", getEtudiantsByGroupeController);
// Liste des étudiants par groupe
router.get("/groupe/:idGroupe", listEtudiantsByGroupe);

// Liste des étudiants par filière
router.get("/filiere/:idFiliere", listEtudiantsByFiliere);

export default router;
