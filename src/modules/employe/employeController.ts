import type { Request, Response } from "express";
import * as employeService from "./employeService";

/* Create Employé */
export const createEmployeController = async (req: Request, res: Response) => {
  try {
    const employeData = req.body;
    const employe = await employeService.createEmploye(employeData);

    return res.status(201).json({
      success: true,
      data: employe,
      message: "Employé créé avec succès",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur création employé.",
      error: error,
    });
  }
};

/* Get Employé By Id */
export const getEmployeByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const employe = await employeService.getEmployeById(id);

    if (!employe) {
      return res.status(404).json({
        success: false,
        message: "Employé non trouvé.",
      });
    }

    return res.status(200).json({
      success: true,
      data: employe,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur récupération employé.",
      error: error,
    });
  }
};

/* Update Employé */
export const updateEmployeController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const employeData = req.body;

    const updated = await employeService.updateEmploye(id, employeData);

    return res.status(200).json({
      success: true,
      message: "Employé mis à jour avec succès",
      data: updated,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur mise à jour employé.",
      error: error,
    });
  }
};

/* Delete Employé */
export const deleteEmployeController = async (req: Request, res: Response) => {
  try {
    const { id }: { id: number } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "L'id est requis dans le body.",
      });
    }

    const employe = await employeService.getEmployeById(id);
    if (!employe) {
      return res.status(404).json({
        success: false,
        message: `Aucun employé trouvé avec l'id ${id}`,
      });
    }

    const deleted = await employeService.deleteEmploye(id);

    return res.status(200).json({
      success: true,
      message: "Employé supprimé avec succès.",
      data: deleted,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur suppression employé.",
      error: error,
    });
  }
};

/* Get All Employés */
export const getAllEmployesController = async (
  _req: Request,
  res: Response
) => {
  try {
    const employes = await employeService.getAllEmployes();

    return res.status(200).json({
      success: true,
      length: employes.length,
      data: employes,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erreur récupération liste employés.",
      error: error,
    });
  }
};
