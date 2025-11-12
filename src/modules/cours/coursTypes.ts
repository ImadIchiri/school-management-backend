export type coursType = {
  id: number;
  titre: string;
  description: string | null;
  dateDebut: Date;
  dateFin: Date;
  duree?: number | null;
  moduleId: number;
  enseignantId?: number | null;
  salleId?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;

  module?: {
    id: number;
    nom: string;
    description: string | null;
    niveauId: number;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
  };

  enseignant?: {
    idEnseignant: number;
    specialite: string;
  } | null;

  salle?: {
    id: number;
    nom: string;
    capacite: number;
  } | null;

  plannings?: {
    id: number;
    dateDebut: Date;
    dateFin: Date;
    description: string | null;
    salleId: number;
    enseignantId: number;
  }[];

  ressources?: {
    ressource: {
      id: number;
      titre: string;
      description: string | null;
      url: string;
    };
  }[];

  absences?: {
    id: number;
    date: Date;
    motif?: string | null;
    statut: string;
    etudiantId: number;
  }[];
};
