import type { Request, Response } from "express";
import * as moduleService from "./moduleService.js";
// import prisma from "../../config/prisma.js";

export const getAllModules = async (req: Request, res: Response) => {
  try {
    const modules = await moduleService.getAllModules();
    return res.status(200).json(modules);
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ error: "Impossible de récupérer les modules" });
  }
};

export const createModule = async (req: Request, res: Response) => {
  try {
    const { nom, description, niveauId } = req.body;

    if (!nom || !niveauId) {
      return res.status(400).json({ error: "nom et niveauId sont requis" });
    }
    const newModule = await moduleService.createModule({ nom, description, niveauId });
    return res.status(201).json(newModule);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Impossible de créer le module" });
  }
};

export const updateModule = async (req: Request, res: Response) => {
  try {
    const { id, nom, description, niveauId } = req.body;

    const module = await moduleService.getModuleById(Number(id));

    if (!module) {
      return res.status(404).json({
        success: false,
        message: `Aucun module trouvé avec l'id ${id}`,
      });
    }

    const updatedModule = await moduleService.updateModule({
      ...module,
      nom,
      description,
      niveauId,
    });

    return res.status(200).json({
      success: true,
      message: "Module mis à jour avec succès",
      data: updatedModule,
    });

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du module",
    });
  }
};


export const getModuleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const module = await moduleService.getModuleById(Number(id));

    if (!module) {
      return res.status(404).json({ error: "Module non trouvé" });
    }

    return res.status(200).json(module);

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ error: "Impossible de récupérer le module" });
  }
};


export const deleteModuleById = async (req: Request, res: Response) => {
  try {
    const { moduleId } = req.body;

    const module = await moduleService.getModuleById(Number(moduleId));

    if (!module) {
      return res.status(404).json({
        success: false,
        message: `Aucun module trouvé avec l'id ${moduleId}`,
      });
    }

    const deletedModule = await moduleService.deleteModule({ id: moduleId });

    return res.status(200).json({
      success: true,
      message: "Module supprimé avec succès",
      data: deletedModule,
    });

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression du module",
    });
  }
};
