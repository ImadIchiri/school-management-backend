// Type principal d'un niveau
export type NiveauScolaire ={
  id: number;
  anneeLabel: string;   // ex: "2025-2026"
  dateDebut: Date;
  dateFin: Date;
  filiereId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Type pour créer un niveau
export type NiveauCreate = {
  anneeLabel: string;
  dateDebut: Date;
  dateFin: Date;
  filiereId: number;
}

// Type pour mettre à jour un niveau
export type NiveauUpdate = {
  anneeLabel?: string;
  dateDebut?: Date;
  dateFin?: Date;
  filiereId?: number;
}
