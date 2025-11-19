import type { Request, Response } from "express";
import * as moduleService from "./moduleService";

// Récupérer tous les modules
export const getAllModules = async (req: Request, res: Response) => {
  try {
    const modules = await moduleService.getAllModules();
    return res.status(200).json(modules);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Impossible de récupérer les modules" });
  }
};

// Créer un module
export const createModule = async (req: Request, res: Response) => {
  try {
    const { nom, description, niveauId } = req.body;

    if (!nom || !niveauId || !description) {
      return res.status(400).json({ error: "nom, description et niveauId sont requis" });
    }

    const newModule = await moduleService.createModule({ nom, description, niveauId });
    return res.status(201).json(newModule);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Impossible de créer le module" });
  }
};

// Récupérer un module par son ID
export const getModuleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const module = await moduleService.getModuleById(Number(id));

    if (!module) {
      return res.status(404).json({ error: "Module non trouvé" });
    }

    return res.status(200).json(module);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Impossible de récupérer le module" });
  }
};

// Mettre à jour un module
export const updateModule = async (req: Request, res: Response) => {
  try {
    const id  = Number(req.params.id);
    const { nom, description, niveauId } = req.body;
    const updated = await moduleService.updateModule(
      id, {nom,
      description,
      niveauId,}
    );

    return res.status(200).json({
      success: true,
      message: "Module mis à jour avec succès",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du module",
    });
  }
};

// Supprimer un module
export const deleteModuleById = async (req: Request, res: Response) => {
  try {
    const  id = Number(req.params.id);
    const deleted = await moduleService.deleteModule(id);

    return res.status(200).json({
      success: true,
      message: "Module supprimé avec succès",
      data: deleted,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression du module",
    });
  }
};
