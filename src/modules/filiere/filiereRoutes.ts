import { Router } from "express";
import * as FiliereController from "./filiereController";

const router = Router();

// Créer une filière -- TESTED 
router.post("/filiere", FiliereController.createFilere);

// Récupérer toutes les filières  -- TESTED 
router.get("/filiere", FiliereController.getAllFilieres);

// Récupérer une filière par ID -- TESTED
router.get("/filiere/:id", FiliereController.getFiliereById);

// Mettre à jour une filière --TESTED 
router.put("/filiere/:id", FiliereController.updateFiliere);

// Supprimer une filière -- TESTED 
router.delete("/filiere/:id", FiliereController.deletefiliere);

// Récupérer les étudiants d'une filière -- TESTED 
router.get("/filiere/:id/etudiants", FiliereController.getEtudiantsByFiliere);

export default router;
