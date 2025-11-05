// Type principal d'un groupe
export type Groupe ={
  id: number;
  nom: string;
  niveauId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Type utilisé lors de la création d'un groupe
export type GroupeCreate = {
  nom: string;
  niveauId: number;
}

// Type utilisé lors de la mise à jour d'un groupe
export type GroupeUpdate = {
  nom?: string;
  niveauId?: number;
}
