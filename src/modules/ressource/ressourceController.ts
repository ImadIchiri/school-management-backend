import type { Request, Response } from "express";
import * as ressourceService from "./ressourceService";
import { uploadToFirebase, deleteFromFirebase } from "../../config/firebaseStorage";
import type { RessourceCreate, RessourceUpdate } from "./ressourceTypes";

// Uploader une ressource et la créer dans Prisma
 
export const uploadRessource = async (req: Request, res: Response) => {
  try {
    const { titre, description, typeId, uploadedById } = req.body;

    if (!titre || !typeId || !uploadedById || !req.file) {
      return res.status(400).json({
        error: "titre, typeId, uploadedById et fichier sont requis"
      });
    }

    // Upload sur Firebase
    const firebasePath = `schoolManagement/${req.file.originalname}`;
    const url = await uploadToFirebase(req.file.buffer, firebasePath);

    // Préparer les données à enregistrer dans Prisma
    const data: RessourceCreate = {
      titre,
      description,
      typeId: Number(typeId),
      uploadedById: Number(uploadedById),
      url,
    };

    const newRessource = await ressourceService.createRessource(data);

    return res.status(201).json({
      success: true,
      message: "Ressource uploadée avec succès",
      data: newRessource,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Impossible de créer la ressource" });
  }
};

// Récupérer toutes les ressources
 
export const getAllRessources = async (req: Request, res: Response) => {
  try {
    const ressources = await ressourceService.getAllRessources();
    return res.status(200).json(ressources);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Impossible de récupérer les ressources" });
  }
};

// Récupérer une ressource par son ID
 
export const getRessourceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ressource = await ressourceService.getRessourceById(Number(id));

    if (!ressource) {
      return res.status(404).json({ error: "Ressource non trouvée" });
    }

    return res.status(200).json(ressource);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Impossible de récupérer la ressource" });
  }
};

//Mettre à jour une ressource

export const updateRessource = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { titre, description, url, typeId, uploadedById } = req.body;

    const data: RessourceUpdate = { titre, description, url, typeId, uploadedById };
    const updated = await ressourceService.updateRessource(id, data);

    return res.status(200).json({
      success: true,
      message: "Ressource mise à jour avec succès",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour de la ressource",
    });
  }
};

// Supprimer une ressource (soft delete + suppression du fichier Firebase)

export const deleteRessourceById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    // 1. Récupérer la ressource
    const ressource = await ressourceService.getRessourceById(id);

    if (!ressource) {
      return res.status(404).json({ error: "Ressource non trouvée" });
    }

    // 2. Supprimer le fichier Firebase directement
    if (ressource.url) {
      await deleteFromFirebase(ressource.url);
    }

    // 3. Soft delete Prisma
    const deleted = await ressourceService.deleteRessource(id);

    return res.status(200).json({
      success: true,
      message: "Ressource supprimée avec succès",
      data: deleted,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de la ressource",
    });
  }
};
