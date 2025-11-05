export type NewCandidat = {
  userId: number;
  statut?: string;
  dossierComplet?: boolean;
  isDeleted?: boolean;
}

export interface ExistingCandidat extends Partial<NewCandidat> {
  
}
