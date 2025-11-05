import type { Request, Response } from "express";
import * as parentService from "./parentServices";

export const createParentController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const parent = await parentService.createParent(userId);
    res.status(201).json(parent);
  } catch (error) {
    res.status(500).json({ error: "Erreur création parent." });
  }
};

export const getParentController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const parent = await parentService.getParentById(id);
  if (!parent) return res.status(404).json({ error: "Parent non trouvé." });
  res.json(parent);
};

export const updateParentController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await parentService.updateParent(id, req.body);
  res.json(updated);
};

export const deleteParentController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await parentService.deleteParent(id);
  res.json({ message: "Parent supprimé.", parent: deleted });
};

export const getAllParentsController = async (_req: Request, res: Response) => {
  const parents = await parentService.getAllParents();
  res.json(parents);
};
