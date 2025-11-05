import { Router } from "express";
import * as GroupController  from "groupeController";

const router = Router();

// Créer un groupe
router.post("/", GroupController.createGroupe);

// Récupérer tous les groupes
router.get("/", GroupController.getAllGroupes);

// Récupérer un groupe par ID
router.get("/:id", GroupController.getGroupeById);

// Mettre à jour un groupe
router.put("/:id", GroupController.updateGroup );

// Supprimer un groupe
router.delete("/:id", GroupController.deleteGroupe);

// Récupérer les étudiants d'un groupe
router.get("/:id/etudiants", GroupController.getEtudiants);

export default router;
