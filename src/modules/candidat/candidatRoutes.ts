import { Router } from "express";
import {
  createCandidatController,
  deleteCandidatController,
  getAllCandidatsController,
  getCandidatByIdController,
  updateCandidatController,
} from "./candidatController";

const candidatRoutes = Router();

candidatRoutes.get("/candidats", getAllCandidatsController);
candidatRoutes.get("/candidats/:id", getCandidatByIdController);
candidatRoutes.post("/candidats", createCandidatController);
candidatRoutes.put("/candidats/:id", updateCandidatController);
candidatRoutes.delete("/candidats", deleteCandidatController);

export default candidatRoutes;
