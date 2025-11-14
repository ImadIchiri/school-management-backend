import express from "express";
import controller from "./absenceController";

const router = express.Router();

/** Routes for absences */
router.get("/", controller.getAllAbsences);
router.get("/:id", controller.getAbsenceById);
router.post("/", controller.createAbsence);
router.put("/:id", controller.updateAbsence);
router.delete("/:id", controller.deleteAbsence);

export default router;
