import { Router } from "express";
import * as coursController from "./coursController.js";

const coursRoutes = Router();

coursRoutes.get("/", coursController.getAllCours);
coursRoutes.get("/:id", coursController.getCoursById);
coursRoutes.post("/", coursController.createCours);
coursRoutes.put("/:id", coursController.updateCours);
coursRoutes.delete("/:id", coursController.deleteCoursById);

export default coursRoutes;
