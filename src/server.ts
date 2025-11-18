import express from "express";
import * as allRoutes from "./routes/index";

import "dotenv/config";

const PORT = process.env.PORT || 8088;
const app = express();

// For Express To Know We Are Using JSON
app.use(express.json());

// Use Event Routes
app.use("/api/v1", allRoutes.eventRoutes);

// Use Event Routes
app.use("/api/v1", allRoutes.opportunityRoutes);

// Use Filiere Routes
app.use("/api/v1", allRoutes.filiereRoutes);
// Use groupe Routes
app.use("/api/v1", allRoutes.groupeRoutes);
// Use niveau Routes
app.use("/api/v1", allRoutes.niveauRoutes );
// Use etudiant Routes
app.use("/api/v1", allRoutes.etudiantRoute );

app.use("/api/v1",allRoutes.moduleRoutes);
app.use("/api/v1",allRoutes.coursRoutes);
// Use Ressource Routes
app.use("/api/v1/ressources", allRoutes.ressourceRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on PORT: ${PORT}`);
});
