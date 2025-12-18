import { Router } from "express";
import * as etudiantController from "./etudiantController";
// Routes etudiant
const router = Router();

// Routes classiques
// CREER UN ETUDIANT -- TESTED
router.post("/etudiant", etudiantController.createEtudiantController);
// RECUPERER TOUS LES ETUDIANTS -- TESTED
router.get("/etudiant", etudiantController.getAllEtudiantsController);
//RECUPERER UN ETUDIANT PAR ID -- TESTED
router.get("/etudiant/:id", etudiantController.getEtudiantController);
// METTRE A JOUR UN ETUDIANT -- TESTED
router.put("/etudiant/:id", etudiantController.updateEtudiantController);
// SUPPRIMER UN ETUDIANT --  TESTED
router.delete("/etudiant/:id", etudiantController.deleteEtudiantController);

// Routes relationnelles
// Étudiants d’une filière -- TESTED
router.get("/filiere/:filiereId/etudiants", etudiantController.getEtudiantsByFiliereController);
// Étudiants d’un niveau -- TESTED but d'ont work
router.get("/niveau/:niveauId", etudiantController.getEtudiantsByNiveauController);
// Étudiants d’un groupe -- TESTED
router.get("/groupe/:groupeId/etudiants", etudiantController.getEtudiantsByGroupeController);
// Liste des étudiants par groupe -- TESTED
router.get("/groupe/:idGroupe/etudiants", etudiantController.listEtudiantsByGroupe);

// Liste des étudiants par filière -- TESTED
router.get("/filiere/:idFiliere/etudiants", etudiantController.listEtudiantsByFiliere);

export default router;
