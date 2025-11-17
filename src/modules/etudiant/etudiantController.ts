import type { Request, Response } from "express";
import * as etudiantService from "./etudiantService";
import * as userService from "../user/userService";

/* Create Etudiant */
export const createEtudiant = async (req: Request, res: Response) => {
  try {
    const etudiantData = req.body; // tout le body
    const etudiant = await etudiantService.createEtudiant(etudiantData);

    return res.status(201).json({
      success: true,
      data: etudiant,
      message: `Étudiant créé avec succès`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur création étudiant.",
      error: error,
    });
  }
};

/* Get Etudiant By Id */
export const getEtudiantById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const etudiant = await etudiantService.getEtudiantById(id);

    if (!etudiant) {
      return res.status(404).json({
        success: false,
        message: "Étudiant non trouvé.",
      });
    }

    return res.status(200).json({
      success: true,
      data: etudiant,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur récupération étudiant.",
      error: error,
    });
  }
};

/* Update Etudiant */
export const updateEtudiant = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id); // ID de l'étudiant à mettre à jour
    const etudiantData = req.body; // Body contenant les champs à mettre à jour

    const updated = await etudiantService.updateEtudiant(id, etudiantData);

    return res.status(200).json({
      success: true,
      message: "Étudiant mis à jour avec succès",
      data: updated,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur mise à jour étudiant.",
      error: error,
    });
  }
};

/* Delete Etudiant */
/* Delete Etudiant */
export const deleteEtudiant = async (req: Request, res: Response) => {
  try {
    const { id }: { id: number } = req.body; // id dans le body

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "L'id est requis dans le body.",
      });
    }

    // Vérifier si l'étudiant existe
    const etudiant = await etudiantService.getEtudiantById(id);
    if (!etudiant) {
      return res.status(404).json({
        success: false,
        message: `Aucun étudiant trouvé avec l'id ${id}`,
      });
    }

    // Suppression logique
    const deleted = await etudiantService.deleteEtudiant(id);

    return res.status(200).json({
      success: true,
      message: "Étudiant supprimé avec succès.",
      data: deleted,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur suppression étudiant.",
      error: error,
    });
  }
};

/* Get All Etudiants */
export const getAllEtudiants = async (_req: Request, res: Response) => {
  try {
    const etudiants = await etudiantService.getAllEtudiants();

    return res.status(200).json({
      success: true,
      length: etudiants.length,
      data: etudiants,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur récupération liste étudiants.",
      error: error,
    });
  }
};
