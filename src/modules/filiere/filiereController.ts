import type { Request, Response } from "express";
import * as FiliereService from "./filiereService";
//import type { FiliereCreate ,FiliereUpdate} from "filiereTypes";


  // Creer une filiere
   export const createFilere = async (req: Request, res: Response) => {
    try {
      const { nom, description } = req.body;
      const filiere = await FiliereService.createFiliere({ nom, description });
      res.status(201).json({ message: "Filière créée avec succès", filiere });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erreur interne" });
    }
  }

  // Lister toutes les filières
   export const getAllFilieres = async (req: Request, res: Response) => {
    try {
      const filieres = await FiliereService.getAllFilieres();
      res.status(200).json(filieres);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erreur interne" });
    }
  }

  // Récupérer une filière par ID
   export const getFiliereById=async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const filiere = await FiliereService.getFiliereById(id);
      if (!filiere) {
        return res.status(404).json({ message: "Filière non trouvée" });
      }
      res.status(200).json({
        success: true,
        data: filiere,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erreur interne" });
    }
  }

  //Mettre à jour une filière
  export const updateFiliere = async(req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { nom, description } = req.body;
      const updated = await FiliereService.updateFiliere(id, { nom, description });
      res.status(200).json({ message: "Filière mise à jour", updated });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erreur interne" });
    }
  }

  // Supprimer une filière
   export const deletefiliere = async(req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const deleted = await FiliereService.deleteFiliere(id);
      res.status(200).json({ message: "Filière supprimée", deleted });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erreur interne" });
    }
  }

  //Lister les étudiants d’une filière
   export const getEtudiantsByFiliere = async(req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const etudiants = await FiliereService.getEtudiantsByFiliere(id);
      res.status(200).json(etudiants);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erreur interne" });
    }
  }
