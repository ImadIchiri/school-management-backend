export type NewOpportunity = {
  titre: string;
  type: string;
  employeId: number;
};

export type ExistingOpportunity = NewOpportunity & {
  id: number;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  isDeleted?: boolean;

  employe?: {
    idEmploye: number;
    poste: string;
    salaire?: number;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    isDeleted?: boolean;
  };

  etudiants?: {
    idEtudiant: number;
    userId: number;
    matricule: string;
    dateInscription: Date;
    filiereId: number;
    groupeId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    isDeleted: boolean;
  }[];
};
