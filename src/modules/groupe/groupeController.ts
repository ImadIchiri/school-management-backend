import type { Request, Response } from "express";
import * as GroupService from "./groupeService";


  export const createGroupe = async (req: Request, res: Response)=> {
    try {
      const { nom, niveauId } = req.body;
      const groupe = await GroupService.createGroupe({ nom, niveauId });
      res.status(201).json({ message: "Groupe créé avec succès", groupe });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erreur interne" });
    }
  }

  export const  getAllGroupes = async (req: Request, res: Response) => {
    try {
      const groupes = await GroupService.getAllGroupes();
      res.status(200).json(groupes);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erreur interne" });
    }
  }

  export const getGroupeById = async(req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const groupe = await GroupService.getGroupeById(id);
      res.status(200).json(groupe);
    } catch (error: any) {
      res.status(404).json({ message: error.message || "Groupe non trouvé" });
    }
  }

  export const updateGroup = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { nom, niveauId } = req.body;
      const updated = await GroupService.updateGroupe(id, { nom, niveauId });
      res.status(200).json({ message: "Groupe mis à jour", updated });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erreur interne" });
    }
  }

  export const deleteGroupe = async (req: Request, res: Response)=> {
    try {
      const id = Number(req.params.id);
      const deleted = await GroupService.deleteGroupe(id);
      res.status(200).json({ message: "Groupe supprimé", deleted });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erreur interne" });
    }
  }

  export const getEtudiants =async (req: Request, res: Response)=> {
    try {
      const id = Number(req.params.id);
      const etudiants = await GroupService.getEtudiantsByGroupe(id);
      res.status(200).json(etudiants);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erreur interne" });
    }
  }

