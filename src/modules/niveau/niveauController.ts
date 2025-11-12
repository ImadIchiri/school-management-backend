import type { Request, Response } from "express";
import * as NiveauService from "./niveauService";


export const createNiveau = async (req: Request, res: Response) => {
  try {
    const { anneeLabel, dateDebut, dateFin, filiereId } = req.body;
    const niveau = await NiveauService.createNiveau({ anneeLabel, dateDebut, dateFin, filiereId });
    res.status(201).json({ message: "Niveau créé avec succès", niveau });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Erreur interne" });
  }
}
export const  getAllNiveaux = async(req: Request, res: Response) =>{
    try {
      const niveaux = await NiveauService.getAllNiveaux();
      res.status(200).json(niveaux);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erreur interne" });
    }
  }

 export const  getNiveauxById = async (req: Request, res: Response) =>{
    try {
      const id = Number(req.params.id);
      const niveau = await NiveauService.getNiveauById(id);
      res.status(200).json(niveau);
    } catch (error: any) {
      res.status(404).json({ message: error.message || "Niveau non trouvé" });
    }
  }

  export const updateNiveau = async (req: Request, res: Response)=> {
    try {
      const id = Number(req.params.id);
      const { anneeLabel, dateDebut, dateFin, filiereId } = req.body;
      const updated = await NiveauService.updateNiveau(id, { anneeLabel, dateDebut, dateFin, filiereId });
      res.status(200).json({ message: "Niveau mis à jour", updated });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erreur interne" });
    }
  }

  export const deleteNiveau = async (req: Request, res: Response)=> {
    try {
      const id = Number(req.params.id);
      const deleted = await NiveauService.deleteNiveau(id);
      res.status(200).json({ message: "Niveau supprimé", deleted });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erreur interne" });
    }
  }

  export const  getGroupes = async(req: Request, res: Response)=> {
    try {
      const id = Number(req.params.id);
      const groupes = await NiveauService.getGroupesByNiveau(id);
      res.status(200).json(groupes);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erreur interne" });
    }
  }
