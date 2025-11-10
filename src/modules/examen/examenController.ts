import type { Request, Response, NextFunction } from "express";
import service from "./examenService";
import type { CreateExamenDTO, UpdateExamenDTO } from "./examenTypes";

const createExamen = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const payload = req.body as Partial<CreateExamenDTO> | undefined;
		// Basic validation to avoid runtime TypeErrors when body is missing
		if (!payload || typeof payload !== "object") {
			return res.status(400).json({ success: false, message: "Invalid or missing request body" });
		}

		// Ensure required fields exist (titre, type, moduleId, enseignantId, dateDebut, dateFin)
		const missing: string[] = [];
		if (!payload.titre) missing.push("titre");
		if (!payload.type) missing.push("type");
		if (!payload.moduleId) missing.push("moduleId");
		if (!payload.enseignantId) missing.push("enseignantId");
		if (!payload.dateDebut) missing.push("dateDebut");
		if (!payload.dateFin) missing.push("dateFin");
		if (missing.length > 0) {
			return res.status(400).json({ success: false, message: `Missing required fields: ${missing.join(", ")}` });
		}

		const created = await service.createExamen(payload as CreateExamenDTO);
		return res.status(201).json(created);
	} catch (err) {
		next(err);
	}
};

const getAllExamens = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { moduleId, enseignantId, from, to } = req.query;
		const filters: any = {};
		if (moduleId) filters.moduleId = Number(moduleId);
		if (enseignantId) filters.enseignantId = Number(enseignantId);
		if (from) filters.from = String(from);
		if (to) filters.to = String(to);

		const list = await service.getAllExamens(filters);
		return res.json(list);
	} catch (err) {
		next(err);
	}
};

const getExamenById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		const item = await service.getExamenById(id);
		return res.json(item);
	} catch (err) {
		next(err);
	}
};

const updateExamen = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		const payload: UpdateExamenDTO = req.body;
		const updated = await service.updateExamen(id, payload);
		return res.json(updated);
	} catch (err) {
		next(err);
	}
};

const deleteExamen = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		const deleted = await service.deleteExamen(id);
		return res.json(deleted);
	} catch (err) {
		next(err);
	}
};



export default { createExamen, getAllExamens, getExamenById, updateExamen, deleteExamen };
