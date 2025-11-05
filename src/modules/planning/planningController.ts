
import type { Request, Response } from "express";
import * as planningService from "./planningService";
import type { ExistingPlanning, NewPlanning } from "./planningTypes";

/*
  Get All Plannings
*/
export const getAllPlannings = async (req: Request, res: Response) => {
  try {
    const data: ExistingPlanning[] = await planningService.getAllPlannings();
    return res.status(200).json({ success: true, data, length: data.length });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message || "Internal Server Error" });
  }
};

/*
  Get Planning by Id
  Accepts :planningId in params or planningId in body
*/
export const getPlanningById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params?.planningId ?? (req.body?.planningId as any);
    const id = Number(idParam);

    if (Number.isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid planning id" });
    }

    const item = await planningService.getPlanningById(id);
    if (!item) {
      return res.status(404).json({ success: false, message: `No planning found for Id: ${id}` });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message || "Internal Server Error Getting Planning" });
  }
};

/*
  Create Planning
  Body: { title, month, startWeek?, notes?, isHoliday? }
*/
export const createPlanning = async (req: Request, res: Response) => {
  try {
    const payload: NewPlanning = req.body;
    const created = await planningService.createPlanning(payload);
    return res.status(201).json({ success: true, data: created, message: "Planning created successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message || "Internal Server Error While Creating Planning" });
  }
};

/*
  Update Planning
  Params: planningId
  Body: fields to update
*/
export const updatePlanning = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params?.planningId ?? req.body?.planningId);
    if (Number.isNaN(id)) return res.status(400).json({ success: false, message: "Invalid planning id" });

    const existing = await planningService.getPlanningById(id);
    if (!existing) return res.status(404).json({ success: false, message: `No planning found for Id: ${id}` });

    const updated = await planningService.updatePlanning({ ...existing, ...req.body });
    return res.status(200).json({ success: true, message: "Planning updated successfully", data: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message || "Error While Updating Planning" });
  }
};

/*

  Delete Planning
  Params: planningId
*/
export const deletePlanning = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params?.planningId ?? req.body?.planningId);
    if (Number.isNaN(id)) return res.status(400).json({ success: false, message: "Invalid planning id" });

    const existing = await planningService.getPlanningById(id);
    if (!existing) return res.status(404).json({ success: false, message: `No planning found for Id: ${id}` });

    const deleted = await planningService.deletePlanning(id);
    return res.status(200).json({ success: true, message: "Planning deleted successfully", data: deleted });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message || "Error While Deleting Planning" });
  }
};

export default {
  getAllPlannings,
  getPlanningById,
  createPlanning,
  updatePlanning,
  deletePlanning,
};
