import type { NewPlanning, ExistingPlanning } from "./planningTypes";
import planningSeed from "./planningSeed";

// In-memory datastore for the planning module. Replace with Prisma DB calls if/when a `Planning` model exists.
let plannings: ExistingPlanning[] = [...planningSeed];

export const getAllPlannings = async (): Promise<ExistingPlanning[]> => {
  return plannings;
};

export const getPlanningById = async (id: number): Promise<ExistingPlanning | undefined> => {
  return plannings.find((p) => p.id === id);
};

export const createPlanning = async (data: NewPlanning): Promise<ExistingPlanning> => {
  const nextId = plannings.length ? Math.max(...plannings.map((p) => p.id)) + 1 : 1;
  const newItem: ExistingPlanning = {
    id: nextId,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  plannings.push(newItem);
  return newItem;
};

export const updatePlanning = async (item: ExistingPlanning): Promise<ExistingPlanning | undefined> => {
  const idx = plannings.findIndex((p) => p.id === item.id);
  if (idx === -1) return undefined;
  const updated: ExistingPlanning = { ...plannings[idx], ...item, updatedAt: new Date() };
  plannings[idx] = updated;
  return updated;
};

export const deletePlanning = async (id: number): Promise<ExistingPlanning | undefined> => {
  const idx = plannings.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  const [removed] = plannings.splice(idx, 1);
  return removed;
};

export default {
  getAllPlannings,
  getPlanningById,
  createPlanning,
  updatePlanning,
  deletePlanning,
};
