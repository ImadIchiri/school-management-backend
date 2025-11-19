import {Router} from "express";
import multer from "multer";
import * as ressourceController from "./ressourceController";
const ressourceRoutes =Router();

// Multer en mémoire (pas de disque)
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Routes
ressourceRoutes.get("/ressources", ressourceController.getAllRessources);
ressourceRoutes.get("/ressources/:id", ressourceController.getRessourceById);
ressourceRoutes.post("/ressources/upload", upload.single("file"), ressourceController.uploadRessource); // "file" = nom du champ form-data
ressourceRoutes.put("/ressources/:id",ressourceController.updateRessource);
ressourceRoutes.delete("/ressources/:id",ressourceController.deleteRessourceById);

export default ressourceRoutes;
