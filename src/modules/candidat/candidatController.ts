import type { Request, Response } from "express";
import * as candidatService from "./candidatService";
import { NewCandidat } from "./candidatTypes";

/* Get All Candidats */
export const getAllCandidatsController = async (
  req: Request,
  res: Response
) => {
  try {
    const candidats = await candidatService.getAllCandidats();
    return res.status(200).json({
      success: true,
      length: candidats.length,
      data: candidats,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error?.message || "Erreur lors de la récupération des candidats.",
      error: error,
    });
  }
};

/* Get Candidat By Id */
export const getCandidatByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const candidat = await candidatService.getCandidatById(id);

    if (!candidat) {
      return res.status(404).json({
        success: false,
        message: "Candidat introuvable.",
      });
    }

    return res.status(200).json({
      success: true,
      data: candidat,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur lors de la récupération du candidat.",
      error: error,
    });
  }
};

/* Create Candidat */
export const createCandidatController = async (req: Request, res: Response) => {
  try {
    const { userId, filiere, niveau, etat } = req.body;

    if (!userId || !filiere || !niveau) {
      return res.status(400).json({
        success: false,
        message: "userId, filiere et niveau sont obligatoires.",
      });
    }

    const newCandidat: NewCandidat = {
      userId,
      filiere,
      niveau,
      etat: etat || "en_attente", // valeur par défaut si non fourni
      dateCandidature: new Date(), // date actuelle
    };

    const createdCandidat = await candidatService.createCandidat(newCandidat);

    return res.status(201).json({
      success: true,
      data: createdCandidat,
      message: "Candidat créé avec succès",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur lors de la création du candidat.",
      error: error,
    });
  }
};

/* Update Candidat */
export const updateCandidatController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedCandidat = await candidatService.updateCandidat(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Candidat mis à jour avec succès",
      data: updatedCandidat,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur lors de la mise à jour du candidat.",
      error: error,
    });
  }
};

/* Delete Candidat */
export const deleteCandidatController = async (req: Request, res: Response) => {
  try {
    const { id }: { id: number } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "L'id est requis dans le body.",
      });
    }

    const candidat = await candidatService.getCandidatById(id);
    if (!candidat) {
      return res.status(404).json({
        success: false,
        message: `Aucun candidat trouvé avec l'id ${id}`,
      });
    }

    const deleted = await candidatService.deleteCandidat(id);

    return res.status(200).json({
      success: true,
      message: "Candidat supprimé avec succès.",
      data: deleted,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur suppression candidat.",
      error: error,
    });
  }
};

