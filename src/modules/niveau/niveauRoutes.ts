import { Router } from "express";
import *as niveauController from "./niveauController";

const router = Router();

// Créer un niveau -- TESTED 
router.post("/niveau", niveauController.createNiveau);

// Récupérer tous les niveaux -- TESTED 
router.get("/niveau", niveauController.getAllNiveaux);

// Récupérer un niveau par ID -- TESTED 
router.get("/niveau/:id", niveauController.getNiveauxById);

// Mettre à jour un niveau -- TESTED 
router.put("/niveau/:id", niveauController. updateNiveau );

// Supprimer un niveau -- TESTED 
router.delete("/niveau/:id", niveauController.deleteNiveau);

// Récupérer les groupes d'un niveau -- TESTED 
router.get("/niveau/:id/groupes", niveauController.getGroupes);

export default router;
