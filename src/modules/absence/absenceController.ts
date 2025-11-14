import service from "./absenceService";
import type { Request, Response, NextFunction } from "express";
import type { CreateAbsenceDTO, UpdateAbsenceDTO, AbsenceFilters } from "./absenceTypes";
import { StatutPresence } from "./absenceTypes";

/**
 * Controller pour le module Absence
 * - Valide les inputs simplement (format attendu) avant d'appeler le service
 * - Renvoie des réponses HTTP explicites (400/201/200)
 */

const parseId = (value: any): number | null => {
	const n = Number(value);
	return Number.isFinite(n) ? n : null;
};

const isValidStatut = (s: any): s is StatutPresence => {
	return Object.values(StatutPresence).includes(s);
};

const createAbsence = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as CreateAbsenceDTO;

		// validations basiques
		const etudiantId = parseId(body?.etudiantId);
		const coursId = parseId(body?.coursId);
		if (!etudiantId || !coursId) return res.status(400).json({ message: "etudiantId et coursId valides requis" });

		if (!body?.date) return res.status(400).json({ message: "date requise" });
		const date = new Date(body.date);
		if (Number.isNaN(date.getTime())) return res.status(400).json({ message: "date invalide" });

		if (body.statut && !isValidStatut(body.statut)) return res.status(400).json({ message: "statut invalide" });

			const payload: CreateAbsenceDTO = {
				date: body.date,
				motif: body.motif ?? null,
				etudiantId,
				coursId,
			} as CreateAbsenceDTO;
			// add statut only when provided to keep strict optional typing happy
			if (body.statut) (payload as any).statut = body.statut;

		const created = await service.createAbsence(payload);
		return res.status(201).json(created);
	} catch (err) {
		next(err);
	}
};

const getAllAbsences = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { etudiantId: e, coursId: c, from, to } = req.query;
		const filters: AbsenceFilters = {};
		const etu = parseId(e);
		const cou = parseId(c);
		if (etu) filters.etudiantId = etu;
		if (cou) filters.coursId = cou;
		if (from) filters.from = String(from);
		if (to) filters.to = String(to);

		const list = await service.getAllAbsences(filters);
		return res.json(list);
	} catch (err) {
		next(err);
	}
};

const getAbsenceById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = parseId(req.params.id);
		if (!id) return res.status(400).json({ message: "id invalide" });

		const item = await service.getAbsenceById(id);

		if (!item) return res.status(404).json({ success: false, message: "absence non trouvée" });

		return res.json({success: true, data: item});
	} catch (err) {
		next(err);
	}
};

const updateAbsence = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = parseId(req.params.id);
		if (!id) return res.status(400).json({ message: "id invalide" });

		const body = req.body as UpdateAbsenceDTO;
		if (body.date) {
			const d = new Date(body.date as any);
			if (Number.isNaN(d.getTime())) return res.status(400).json({ message: "date invalide" });
		}
		if (body.statut && !isValidStatut(body.statut)) return res.status(400).json({ message: "statut invalide" });

		const updated = await service.updateAbsence(id, body);
		return res.json(updated);
	} catch (err) {
		next(err);
	}
};

const deleteAbsence = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = parseId(req.params.id);
		if (!id) return res.status(400).json({ message: "id invalide" });

		const deleted = await service.deleteAbsence(id);
		return res.json(deleted);
	} catch (err) {
		next(err);
	}
};

export default {
	createAbsence,
	getAllAbsences,
	getAbsenceById,
	updateAbsence,
	deleteAbsence,
};
