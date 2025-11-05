import type { Request, Response, NextFunction } from "express";
import service from "./examenService";
import type { CreateExamenDTO, UpdateExamenDTO } from "./examenTypes";

const createExamen = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const payload: CreateExamenDTO = req.body;
		const created = await service.createExamen(payload);
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
