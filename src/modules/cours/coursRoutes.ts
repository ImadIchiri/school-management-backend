import { Router } from "express";
import * as coursController from "./coursController";

const coursRoutes = Router();

coursRoutes.get("/cours", coursController.getAllCours);
coursRoutes.get("/cours/:id", coursController.getCoursById);
coursRoutes.post("/cours", coursController.createCours);
coursRoutes.put("/cours/:id", coursController.updateCours);
coursRoutes.delete("/cours/:id", coursController.deleteCoursById);

export default coursRoutes;
