// Type principal d’un cours
export type cours = {
  id: number;
  titre: string;
  description?: string; 
  dateDebut: Date;
  dateFin: Date;
  duree?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  isDeleted?: boolean;
  moduleId: number;
  enseignantId?: number;
  salleId?: number;
  salle?: any;
};

// Type utilisé lors de la création d’un cours
export type coursCreate = {
  titre: string;
  description?: string;
  dateDebut: Date;
  dateFin: Date;
  duree?: number;
  moduleId: number;
  enseignantId?: number;
  salleId?: number;
};

// Type utilisé lors de la mise à jour d’un cours
export type coursUpdate = {
  titre?: string;
  description?: string;
  dateDebut?: Date;
  dateFin?: Date;
  duree?: number;
  moduleId?: number;
  enseignantId?: number;
  salleId?: number;
};
