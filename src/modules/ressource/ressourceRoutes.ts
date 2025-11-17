import express from "express";
import multer from "multer";
import * as ressourceController from "./ressourceController";

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

const ressourcRrouter = express.Router();

// Upload Single file named: ressource
ressourcRrouter.post(
  "/upload",
  upload.single("ressource"),
  ressourceController.createRessource
);

export default ressourcRrouter;
