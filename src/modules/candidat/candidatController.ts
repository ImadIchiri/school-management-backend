import type { Request, Response } from "express";
import {
  getAllCandidats,
  getCandidatById,
  createCandidat,
  updateCandidat,
  deleteCandidat,
} from "./candidatService";

export const getAllCandidatsController = async (
  req: Request,
  res: Response
) => {
  try {
    const candidats = await getAllCandidats();
    res.json(candidats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des candidats." });
  }
};

export const getCandidatByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const candidat = await getCandidatById(Number(req.params.id));
    if (!candidat) {
      return res.status(404).json({ message: "Candidat introuvable." });
    }
    res.json(candidat);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du candidat." });
  }
};

export const createCandidatController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const newCandidat = await createCandidat(userId);
    res.status(201).json(newCandidat);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création du candidat." });
  }
};

export const updateCandidatController = async (req: Request, res: Response) => {
  try {
    const updatedCandidat = await updateCandidat(
      Number(req.params.id),
      req.body
    );
    res.json(updatedCandidat);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du candidat." });
  }
};

export const deleteCandidatController = async (req: Request, res: Response) => {
  try {
    await deleteCandidat(Number(req.params.id));
    res.json({ message: "Candidat supprimé avec succès." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du candidat." });
  }
};
