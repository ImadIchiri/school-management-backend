/**
 * DTOs for Examen module
 */
export type CreateEtudiantExamenDTO = {
  etudiantId: number;
  present?: boolean;
  note?: number;
  mention?: string;
  dateEvaluation?: Date | string;
};

export type CreateExamenDTO = {
  titre: string;
  type: string;
  coeff?: number;
  dateDebut: Date | string;
  dateFin: Date | string;
  dureeMinutes?: number | null;
  moduleId: number;
  enseignantId: number;
  salleId?: number | null;
  etudiants?: CreateEtudiantExamenDTO[]; // optional initial students
};

export type UpdateExamenDTO = Partial<CreateExamenDTO>;

export type ExamenFilters = {
  moduleId?: number;
  enseignantId?: number;
  from?: Date | string;
  to?: Date | string;
};

export default {} as const;
