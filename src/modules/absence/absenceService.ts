import prisma from "../../config/prisma";
import type { CreateAbsenceDTO, UpdateAbsenceDTO, AbsenceFilters } from "./absenceTypes";
import { StatutPresence } from "./absenceTypes";

/** Helpers */
const toDate = (d: string | Date) => (typeof d === "string" ? new Date(d) : d);

const ensureEtudiantExists = async (idEtudiant: number) => {
	const student = await prisma.etudiant.findFirst({ where: { idEtudiant, isDeleted: false } });
	if (!student) {
		const err: any = new Error("Étudiant introuvable");
		err.statusCode = 404;
		throw err;
	}
	return student;
};

const ensureCoursExists = async (coursId: number) => {
	const cours = await prisma.cours.findFirst({ where: { id: coursId, isDeleted: false } });
	if (!cours) {
		const err: any = new Error("Cours introuvable");
		err.statusCode = 404;
		throw err;
	}
	return cours;
};

/** Service methods */
const createAbsence = async (payload: CreateAbsenceDTO) => {
	const { etudiantId, coursId, date, motif, statut } = payload;

	// validate related entities
	await ensureEtudiantExists(etudiantId);
	await ensureCoursExists(coursId);

	// default statut
	const finalStatut = statut ?? StatutPresence.PRESENT;

	const newAbsence = await prisma.absence.create({
		data: {
			date: toDate(date),
			motif: motif ?? null,
			statut: finalStatut,
			etudiantId,
			coursId,
		},
		include: { etudiant: { include: { user: true } }, cours: true },
	});

	return newAbsence;
};

const getAllAbsences = async (filters?: AbsenceFilters) => {
	const where: any = { isDeleted: false };
	if (filters?.etudiantId) where.etudiantId = filters.etudiantId;
	if (filters?.coursId) where.coursId = filters.coursId;
	if (filters?.from || filters?.to) {
		where.date = {};
		if (filters.from) where.date.gte = toDate(filters.from);
		if (filters.to) where.date.lte = toDate(filters.to);
	}

	const absences = await prisma.absence.findMany({
		where,
		orderBy: { date: "desc" },
		include: { etudiant: { include: { user: true } }, cours: true },
	});

	return absences;
};

const getAbsenceById = async (id: number) => {
	const absence = await prisma.absence.findFirst({ where: { id, isDeleted: false }, include: { etudiant: { include: { user: true } }, cours: true } });
	if (!absence) {
		const err: any = new Error("Absence introuvable");
		err.statusCode = 404;
		throw err;
	}
	return absence;
};

const updateAbsence = async (id: number, payload: UpdateAbsenceDTO) => {
	const existing = await prisma.absence.findFirst({ where: { id, isDeleted: false } });
	if (!existing) {
		const err: any = new Error("Absence introuvable");
		err.statusCode = 404;
		throw err;
	}

	const data: any = {};
	if (payload.date) data.date = toDate(payload.date as any);
	if (payload.motif !== undefined) data.motif = payload.motif;
	if (payload.statut) data.statut = payload.statut;
	if (payload.etudiantId) {
		await ensureEtudiantExists(payload.etudiantId);
		data.etudiantId = payload.etudiantId;
	}
	if (payload.coursId) {
		await ensureCoursExists(payload.coursId);
		data.coursId = payload.coursId;
	}

	const updated = await prisma.absence.update({ where: { id }, data, include: { etudiant: { include: { user: true } }, cours: true } });
	return updated;
};

const deleteAbsence = async (id: number) => {
	const existing = await prisma.absence.findFirst({ where: { id } });
	if (!existing) {
		const err: any = new Error("Absence introuvable");
		err.statusCode = 404;
		throw err;
	}
	if ((existing as any).isDeleted === true) {
		const err: any = new Error("Absence déjà supprimée");
		err.statusCode = 409;
		throw err;
	}

	const updateData: any = { isDeleted: true };
	// set deletedAt if you use that field elsewhere
	updateData.deletedAt = new Date();

	const deleted = await prisma.absence.update({ where: { id }, data: updateData as any, include: { etudiant: { include: { user: true } }, cours: true } });
	return deleted;
};

export default {
	createAbsence,
	getAllAbsences,
	getAbsenceById,
	updateAbsence,
	deleteAbsence,
};

