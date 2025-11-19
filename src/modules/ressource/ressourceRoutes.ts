import express from "express";
import multer from "multer";
import {
  uploadRessource,
  getAllRessources,
  deleteRessourceById,
  getRessourceById,
  updateRessource,
} from "./ressourceController";

const ressourceRouter = express.Router();

// Multer en mémoire (pas de disque)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
ressourceRouter.get("/ressources", getAllRessources);
ressourceRouter.get("/ressources/:id", getRessourceById);
ressourceRouter.post(
  "/ressources/upload",
  upload.single("file"),
  uploadRessource
); // "file" = nom du champ form-data
ressourceRouter.put("/ressources/:id", updateRessource);
ressourceRouter.delete("/ressources/:id", deleteRessourceById);

export default ressourceRouter;
