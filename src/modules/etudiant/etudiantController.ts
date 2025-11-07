import type { Request, Response } from "express";
import * as etudiantService from "./etudiantService";
// Controlleurs Etudiant
export const createEtudiant = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const etudiant = await etudiantService.createEtudiant(userId);
    res.status(201).json(etudiant);
  } catch (error) {
    res.status(500).json({ error: "Erreur création étudiant." });
  }
};

export const getEtudiantById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const etudiant = await etudiantService.getEtudiantById(id);
  if (!etudiant) return res.status(404).json({ error: "Étudiant non trouvé." });
  res.json(etudiant);
};

export const updateEtudiant = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await etudiantService.updateEtudiant(id, req.body);
  res.json(updated);
};

export const deleteEtudiant = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await etudiantService.deleteEtudiant(id);
  res.json({ message: "Étudiant supprimé.", etudiant: deleted });
};

export const getAllEtudiants = async (_req: Request, res: Response) => {
  const etudiants = await etudiantService.getAllEtudiants();
  res.json(etudiants);
};
