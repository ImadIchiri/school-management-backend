import type { Request, Response } from "express";
import * as coursService from "./coursService.js";

export const getAllCours = async (req: Request, res: Response) => {
  try {
    const cours = await coursService.getAllCours();
    return res.status(200).json(cours);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Impossible de récupérer les cours" });
  }
};

export const getCoursById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cours = await coursService.getCoursById(Number(id));
    if (!cours) return res.status(404).json({ error: "Cours non trouvé" });
    return res.status(200).json(cours);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de la récupération du cours" });
  }
};

export const createCours = async (req: Request, res: Response) => {
  try {
    const { titre, description, dateDebut, dateFin, duree, moduleId, enseignantId, salleId } = req.body;
    if (!titre || !dateDebut || !dateFin || !moduleId) {
      return res.status(400).json({ error: "titre, dateDebut, dateFin et moduleId sont requis" });
    }

    const newCours = await coursService.createCours({
      titre,
      description,
      dateDebut: new Date(dateDebut),
      dateFin: new Date(dateFin),
      duree,
      moduleId,
      enseignantId,
      salleId,
    });

    return res.status(201).json(newCours);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Impossible de créer le cours" });
  }
};

export const updateCours = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titre, description, dateDebut, dateFin, duree, moduleId, enseignantId, salleId } = req.body;

    const existing = await coursService.getCoursById(Number(id));
    if (!existing) return res.status(404).json({ error: "Cours non trouvé" });

    const updated = await coursService.updateCours({
      id: Number(id),
      titre,
      description,
      dateDebut: dateDebut ? new Date(dateDebut) : existing.dateDebut,
      dateFin: dateFin ? new Date(dateFin) : existing.dateFin,
      duree,
      moduleId,
      enseignantId,
      salleId,
    });

    return res.status(200).json({ success: true, message: "Cours mis à jour", data: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de la mise à jour du cours" });
  }
};

export const deleteCoursById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existing = await coursService.getCoursById(Number(id));
    if (!existing) return res.status(404).json({ error: "Cours non trouvé" });

    const deleted = await coursService.deleteCours(Number(id));
    return res.status(200).json({ success: true, message: "Cours supprimé", data: deleted });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de la suppression du cours" });
  }
};
