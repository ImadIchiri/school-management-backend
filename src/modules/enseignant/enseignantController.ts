import type { Request, Response } from "express";
import * as enseignantService from "./enseignantService";

/* Get All Enseignants */
export const getAllEnseignantsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const enseignants = await enseignantService.getAllEnseignants();

    return res.status(200).json({
      success: true,
      length: enseignants.length,
      data: enseignants,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur récupération liste enseignants.",
      error: error,
    });
  }
};

/* Get Enseignant By Id */
export const getEnseignantController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const enseignant = await enseignantService.getEnseignantById(id);
    
    if (!enseignant) {
      return res.status(404).json({
        success: false,
        message: "Enseignant non trouvé.",
      });
    }

    return res.status(200).json({
      success: true,
      data: enseignant,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur récupération enseignant.",
      error: error,
    });
  }
};

/* Create Enseignant */
export const createEnseignantController = async (
  req: Request,
  res: Response
) => {
  try {
    const { specialite, employeId } = req.body;
    const enseignant = await enseignantService.createEnseignant({
      specialite,
      employeId,
    });
    return res.status(201).json({
      success: true,
      data: enseignant,
      message: "Enseignant créé avec succès",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur création enseignant.",
      error: error,
    });
  }
};

/* Update Enseignant */
export const updateEnseignantController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const updated = await enseignantService.updateEnseignant(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Enseignant mis à jour avec succès",
      data: updated,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        "********* mise à jour echoué *********" + error?.message ||
        "Erreur mise à jour enseignant.",
      error: error,
    });
  }
};

/* Delete Enseignant */
export const deleteEnseignantController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id }: { id: number } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "L'id est requis dans le body.",
      });
    }

    const enseignant = await enseignantService.getEnseignantById(id);
    if (!enseignant) {
      return res.status(404).json({
        success: false,
        message: `Aucun enseignant trouvé avec l'id ${id}`,
      });
    }

    const deleted = await enseignantService.deleteEnseignant(id);

    return res.status(200).json({
      success: true,
      message: "Enseignant supprimé avec succès.",
      data: deleted,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur suppression enseignant.",
      error: error,
    });
  }
};

