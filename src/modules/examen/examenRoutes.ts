import { Router } from "express";
import controller from "./examenController";

const router = Router();

router.get("/", controller.getAllExamens);
router.get("/:id", controller.getExamenById);
router.post("/", controller.createExamen);
router.put("/:id", controller.updateExamen);
router.delete("/:id", controller.deleteExamen);

export default router;
