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
// CREER UN ETUDIANT -- TESTED 
router.post("/etudiant", createEtudiantController);
// RECUPERER TOUS LES ETUDIANTS -- TESTED 
router.get("/etudiant", getAllEtudiantsController);
//RECUPERER UN ETUDIANT PAR ID -- TESTED
router.get("/etudiant/:id", getEtudiantController);
// METTRE A JOUR UN ETUDIANT -- TESTED 
router.put("/etudiant/:id", updateEtudiantController);
// SUPPRIMER UN ETUDIANT --  TESTED 
router.delete("/etudiant/:id", deleteEtudiantController);

// Routes relationnelles
// Étudiants d’une filière -- TESTED 
router.get("/filiere/:filiereId/etudiants", getEtudiantsByFiliereController);
// Étudiants d’un niveau -- TESTED but d'ont work
router.get("/niveau/:niveauId", getEtudiantsByNiveauController);
// Étudiants d’un groupe -- TESTED
router.get("/groupe/:groupeId/etudiants", getEtudiantsByGroupeController);
// Liste des étudiants par groupe -- TESTED 
router.get("/groupe/:idGroupe/etudiants", listEtudiantsByGroupe);

// Liste des étudiants par filière -- TESTED 
router.get("/filiere/:idFiliere/etudiants", listEtudiantsByFiliere);

export default router;
