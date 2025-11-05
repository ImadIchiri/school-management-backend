import { Router } from "express";
import * as FiliereController from "filiereController";

const router = Router();

// Créer une filière
router.post("/", FiliereController.createFilere);

// Récupérer toutes les filières
router.get("/", FiliereController.getAllFilieres);

// Récupérer une filière par ID
router.get("/:id", FiliereController.getFiliereById);

// Mettre à jour une filière
router.put("/:id", FiliereController.updateFiliere);

// Supprimer une filière
router.delete("/:id", FiliereController.deletefiliere);

// Récupérer les étudiants d'une filière
router.get("/:id/etudiants", FiliereController.getEtudiants);

export default router;
