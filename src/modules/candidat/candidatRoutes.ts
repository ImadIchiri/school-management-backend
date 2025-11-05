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
candidatRoutes.get("/candidats/:candidatId", getCandidatByIdController);
candidatRoutes.post("/candidats", createCandidatController);
candidatRoutes.put("/candidats/:candidatId", updateCandidatController);
candidatRoutes.put("/candidats/:candidatId", deleteCandidatController);

export default candidatRoutes;
