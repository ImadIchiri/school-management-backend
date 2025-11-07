import type { Request, Response } from "express";
import * as etudiantService from "./etudiantService";
// Controlleurs Etudiant
export const createEtudiantController = async (req: Request, res: Response) => {
  try {
    const etudiant = await etudiantService.createEtudiant(req.body);
    res.status(201).json(etudiant);
  } catch (error) {
    res.status(500).json({ error: "Erreur création étudiant." });
  }
};

export const getEtudiantController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const etudiant = await etudiantService.getEtudiantById(id);
  if (!etudiant) return res.status(404).json({ error: "Étudiant non trouvé." });
  res.json(etudiant);
};

export const updateEtudiantController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await etudiantService.updateEtudiant(id, req.body);
  res.json(updated);
};

export const deleteEtudiantController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await etudiantService.deleteEtudiant(id);
  res.json({ message: "Étudiant supprimé.", etudiant: deleted });
};

export const getAllEtudiantsController = async (
  _req: Request,
  res: Response
) => {
  const etudiants = await etudiantService.getAllEtudiants();
  res.json(etudiants);
};
