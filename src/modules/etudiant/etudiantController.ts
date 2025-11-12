import type { Request, Response } from "express";
import * as etudiantService from "./etudiantService";
import { getEtudiantsByGroupe, getEtudiantsByFiliere } from "./etudiantService";

/* 
    Créer un étudiant
    Request Body: { matricule: string; userId: number; groupeId: number; filiereId: number ; dateInscription : Date}
*/
export const createEtudiantController = async (req: Request, res: Response) => {
  try {
    const { matricule, userId, groupeId, filiereId, dateInscription} = req.body;
    const etudiant = await etudiantService.createEtudiant({matricule, userId, groupeId, filiereId, dateInscription});

    res.status(201).json(etudiant);
  } catch (error) {
    
    console.error("Erreur lors de la création de l'étudiant :", error);
    res.status(500).json({ error: "Erreur lors de la création de l'étudiant." });
  }
};
/* 
    Récupérer tous les étudiants
    Request Body: 
*/
export const getAllEtudiantsController = async (_req: Request, res: Response) => {
try {
  const etudiants = await etudiantService.getAllEtudiants();
  res.json(etudiants);
} catch (error) {
  console.error("Erreur lors de la récupération des étudiants :", error);
  res.status(500).json({ error: "Erreur lors de la récupération des étudiants."  
  });
}
};
/* 
    Récupérer un étudiant par ID
    Request Body: {etudiantId: number}
*/
export const getEtudiantController = async (req: Request, res: Response) => {
  try { 
    const id = Number(req.params.id);
    const etudiant = await etudiantService.getEtudiantById(id);
    if (!etudiant) return res.status(404).json({ error: "Étudiant non trouvé." });
    res.json(etudiant);
 }
   catch (error) {
    console.error("Erreur lors de la récupération de l'étudiant :", error);
    res.status(500).json({ error: "Erreur lors de la récupération de l'étudiant." });
  }
};
/* 
    Mise à jour d’un étudiant
    Request Body: { eventId: Int, titre: string, date DateTime, employeId Int }
*/
export const updateEtudiantController = async (req: Request, res: Response) => {

  try {
    const id = Number(req.params.id);
    const updated = await etudiantService.updateEtudiant(id, req.body);
    res.json(updated);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'étudiant :", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'étudiant." });
  }
};

// Suppression (soft delete)
export const deleteEtudiantController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleted = await etudiantService.deleteEtudiant(id);
    res.json({ message: "Étudiant supprimé.", etudiant: deleted });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'étudiant :", error);
    res.status(500).json({ error: "Erreur lors de la suppression de l'étudiant." });
  }
};

// Étudiants d’une filière
export const getEtudiantsByFiliereController = async (req: Request, res: Response) => {
  try { 
        const filiereId = Number(req.params.filiereId);
          const etudiants = await etudiantService.getEtudiantsByFiliere(filiereId);
          res.json(etudiants);
  }catch (error) {
        console.error("Erreur lors de la récupération des étudiants par filière :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des étudiants par filière." });
  }
};

// Étudiants d’un niveau
export const getEtudiantsByNiveauController = async (req: Request, res: Response) => {
   try {
      const niveauId = Number(req.params.niveauId);
      const etudiants = await etudiantService.getEtudiantsByNiveau(niveauId);
      res.json(etudiants);
    } 
   catch (error) {
        console.error("Erreur lors de la récupération des étudiants par niveau :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des étudiants par niveau." });
   } 
};

// Étudiants d’un groupe
export const getEtudiantsByGroupeController = async (req: Request, res: Response) => {
  try {
  const groupeId = Number(req.params.groupeId);
  const etudiants = await etudiantService.getEtudiantsByGroupe(groupeId);
  res.json(etudiants);}
    catch (error) {
      console.error("Erreur lors de la récupération des étudiants par groupe :", error);
      res.status(500).json({ error: "Erreur lors de la récupération des étudiants par groupe." });
   }
};

export const listEtudiantsByGroupe = async (req: Request, res: Response) => {
  try {
    const idGroupe = Number(req.params.idGroupe);
    const etudiants = await getEtudiantsByGroupe(idGroupe);
    res.json(etudiants);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des étudiants par groupe", error });
  }
};

export const listEtudiantsByFiliere = async (req: Request, res: Response) => {
  try {
    const idFiliere = Number(req.params.idFiliere);
    if (isNaN(idFiliere)) {
      return res.status(400).json({ message: "ID de filière invalide" });
    }

    const etudiants = await getEtudiantsByFiliere(idFiliere);

    if (etudiants.length === 0) {
      return res.status(404).json({ message: "Aucun étudiant trouvé pour cette filière" });
    }

    res.status(200).json(etudiants);
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur lors de la récupération des étudiants par filière",
      error: error.message,
    });
  }
};

