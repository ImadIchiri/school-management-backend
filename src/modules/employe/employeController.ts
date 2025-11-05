import type { Request, Response } from "express";
import * as employeService from "./employeService";

export const createEmployeController = async (req: Request, res: Response) => {
  try {
    const { poste, salaire, userId } = req.body;
    const employe = await employeService.createEmploye({
      poste,
      salaire,
      userId,
    });
    res.status(201).json(employe);
  } catch (error) {
    res.status(500).json({ error: "Erreur création employé." });
  }
};

export const getEmployeByIdController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const employe = await employeService.getEmployeById(id);
  if (!employe) return res.status(404).json({ error: "Employé non trouvé." });
  res.json(employe);
};

export const updateEmployeController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await employeService.updateEmploye(id, req.body);
  res.json(updated);
};

export const deleteEmployeController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await employeService.deleteEmploye(id);
  res.json({ message: "Employé supprimé.", employe: deleted });
};

export const getAllEmployesController = async (
  _req: Request,
  res: Response
) => {
  const employes = await employeService.getAllEmployes();
  res.json(employes);
};
