/**
 * Types used by the Absence module (DTOs)
 */
export enum StatutPresence {
	PRESENT = "PRESENT",
	ABSENT = "ABSENT",
	RETARD = "RETARD",
	JUSTIFIE = "JUSTIFIE",
}

/** Payload pour la création d'une absence */
export type CreateAbsenceDTO = {
	date: string | Date; // ISO string ou Date
	motif?: string | null;
	statut?: StatutPresence;
	etudiantId: number;
	coursId: number;
};

/** Payload pour la mise à jour (fields optionnels) */
export type UpdateAbsenceDTO = Partial<CreateAbsenceDTO>;

/** Filtres utilisables pour la liste */
export type AbsenceFilters = {
	etudiantId?: number;
	coursId?: number;
	from?: string | Date;
	to?: string | Date;
};

// Petit export par défaut pour compatibilité (vide, lisible)
export default {} as const;
