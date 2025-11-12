import type {
  EtatCandidature,
  NiveauCandidat,
} from "../../generated/prisma/enums";

export type NewCandidat = {
  userId: number;
  dateCandidature: Date;
  etat: EtatCandidature;
  filiere: string;
  niveau: NiveauCandidat;
};

export type ExistingCandidat = NewCandidat & {
  idCandidature: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
  etudiantIdEtudiant: number | null;
};
