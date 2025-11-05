import { Router } from "express";
import *as niveauController from "niveauController";

const router = Router();

// Créer un niveau
router.post("/", niveauController.createNiveau);

// Récupérer tous les niveaux
router.get("/", niveauController.getAllNiveaux);

// Récupérer un niveau par ID
router.get("/:id", niveauController.getNiveauxById);

// Mettre à jour un niveau
router.put("/:id", niveauController. updateNiveau );

// Supprimer un niveau
router.delete("/:id", niveauController.deleteNiveau);

// Récupérer les groupes d'un niveau
router.get("/:id/groupes", niveauController.getGroupes);

export default router;
