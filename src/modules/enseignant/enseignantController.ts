import type { Request, Response } from "express";
import * as enseignantService from "./enseignantServices";

export const createEnseignantController = async ( req: Request, res: Response ) => {
  try {
    const { specialite, employeId } = req.body;
    const enseignant = await enseignantService.createEnseignant({specialite, employeId, });
    res.status(201).json(enseignant);
  } catch (error) {
    res.status(500).json({ error: "Erreur création enseignant." });
  }
};

export const getEnseignantController = async (req: Request, res: Response) => {
  const id = Number(req.params);
  const enseignant = await enseignantService.getEnseignantById(id);
  if (!enseignant)
    return res.status(404).json({ error: "Enseignant non trouvé." });
  res.json(enseignant);
};

export const updateEnseignantController = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);
  const updated = await enseignantService.updateEnseignant(id, req.body);
  res.json(updated);
};

export const deleteEnseignantController = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);
  const deleted = await enseignantService.deleteEnseignant(id);
  res.json({ message: "Enseignant supprimé.", enseignant: deleted });
};

export const getAllEnseignantsController = async (
  _req: Request,
  res: Response
) => {
  const enseignants = await enseignantService.getAllEnseignants();
  res.json(enseignants);
};
