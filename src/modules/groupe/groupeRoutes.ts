import { Router } from "express";
import * as GroupController  from "./groupeController";

const router = Router();

// Créer un groupe -- TESTED 
router.post("/group", GroupController.createGroupe);

// Récupérer tous les groupes -- TESTED 
router.get("/group", GroupController.getAllGroupes);

// Récupérer un groupe par ID -- TESTED 
router.get("/group/:id", GroupController.getGroupeById);

// Mettre à jour un groupe -- TESTED 
router.put("/group/:id", GroupController.updateGroup );

// Supprimer un groupe -- TESTED 
router.delete("/group/:id", GroupController.deleteGroupe);

// Récupérer les étudiants d'un groupe -- TESTED 
router.get("/group/:id/etudiants", GroupController.getEtudiants);

export default router;
