import type { Request, Response } from "express";
import * as candidatService from "./candidatService";

/* Get All Candidats */
export const getAllCandidatsController = async (req: Request, res: Response) => {
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
      message: error?.message || "Erreur lors de la récupération des candidats.",
      error,
    });
  }
};

/* Get Candidat By Id */
export const getCandidatByIdController = async (req: Request, res: Response) => {
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
      error,
    });
  }
};

/* Create Candidat + User */
export const createCandidatController = async (req: Request, res: Response) => {
  try {
    const {
      nom,
      prenom,
      dateNaissance,
      adresse,
      telephone,
      email,
      password,
      filiere,
      niveau,
    } = req.body;

    // Validation minimale
    if (!nom || !prenom || !dateNaissance || !adresse || !telephone || !email || !password || !filiere || !niveau) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont obligatoires.",
      });
    }

    // Création User + Candidat
    const candidat = await candidatService.createUserAndCandidat({
      nom,
      prenom,
      dateNaissance,
      adresse,
      telephone,
      email,
      password,
      filiere,
      niveau,
    });

    return res.status(201).json({
      success: true,
      message: "Candidature créée avec succès.",
      data: candidat,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur lors de la création de la candidature.",
      error,
    });
  }
};

/* Update Candidat */
export const updateCandidatController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { etat } = req.body;

    // Vérifier que l'état est valide selon le schema Prisma
    const validEtats = ["en_attente", "en_cours", "accepte", "refuse", "incomplet"];
    if (!validEtats.includes(etat)) {
      return res.status(400).json({ success: false, message: "Valeur d'état invalide." });
    }

    const updatedCandidat = await candidatService.updateCandidat(id, { etat });

    return res.status(200).json({
      success: true,
      message: "Candidat mis à jour avec succès",
      data: updatedCandidat,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur lors de la mise à jour du candidat.",
      error,
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
      error,
    });
  }
};
