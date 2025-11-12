export type moduleType = {
  id: number;
  nom: string;
  description: string; // obligatoire
  niveauId: number;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  enseignants?: {
    id: number;
    enseignantId: number;
    dateAffectation: Date;
  }[];
};
