// Type principal d’un module
export type Module = {
  id: number;
  nom: string;
  description: string;
  niveauId: number;
  createdAt: Date;
  updatedAt: Date;
};

// Type utilisé lors de la création d’un module
export type moduleCreate = {
  nom: string;
  description: string;
  niveauId: number;
};

// Type utilisé lors de la mise à jour d’un module
export type moduleUpdate = {
  nom?: string;
  description: string;
  niveauId?: number;
};
