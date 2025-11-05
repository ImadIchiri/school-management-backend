// Type principal d'une filière
export type Filiere = {
  id: number;
  nom: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Type utilisé lors de la création d'une filière
export type FiliereCreate ={
  nom: string;
  description: string;
}

// Type utilisé lors de la mise à jour d'une filière
export type FiliereUpdate = {
  nom?: string;
  description?: string;
}
