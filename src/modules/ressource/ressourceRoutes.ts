import express from "express";
import multer from "multer";
import { uploadRessource, getAllRessources,deleteRessourceById,getRessourceById,updateRessource } from "./ressourceController";

const router = express.Router();

// Multer en mémoire (pas de disque)
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Routes
router.get("/", getAllRessources);
router.get("/:id", getRessourceById);
router.post("/upload", upload.single("file"), uploadRessource); // "file" = nom du champ form-data
router.put("/:id",updateRessource);
router.delete("/:id",deleteRessourceById);

export default router;
