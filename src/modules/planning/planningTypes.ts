export type NewPlanning = {
  dateDebut: string | Date;
  dateFin: string | Date;
  description: string;
  coursId: number;
  enseignantId: number;
  salleId: number;
  isDeleted?: boolean;
};

export type ExistingPlanning = NewPlanning & {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
};

// Note: do not export types as default to remain compatible with TS settings
