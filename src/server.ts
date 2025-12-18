import express from "express";
import * as allRoutes from "./routes/index";

import "dotenv/config";

const PORT = process.env.PORT || 8088;
const app = express();

// For Express To Know We Are Using JSON
app.use(express.json());

// To Be Tested
// Array(allRoutes).forEach((routesList) => {
//   app.use("/api/v1", routesList as any);
// });

// Use Auth Routes
app.use("/api/v1", allRoutes.authRoutes);

// Use Event Routes
app.use("/api/v1", allRoutes.eventRoutes);

// Use Event Routes
app.use("/api/v1", allRoutes.opportunityRoutes);

// Use Role Routes
app.use("/api/v1", allRoutes.roleRoutes);

// Use Permission Routes
app.use("/api/v1", allRoutes.permissionRoutes);

// Use User Routes
app.use("/api/v1", allRoutes.userRoutes);

// Use Candidat Routes
app.use("/api/v1", allRoutes.candidatRoutes);

// Use Employe Routes
app.use("/api/v1", allRoutes.employeRoutes);

// Use Ensignat Routes
app.use("/api/v1", allRoutes.enseignantRoutes);

// Use Etudiant Routes
app.use("/api/v1", allRoutes.etudiantRoutes);

// Use Parent Routes
app.use("/api/v1", allRoutes.parentRoutes);
// Use Planning Routes
app.use("/api/v1", allRoutes.planningRoutes);

// Use Absence Routes
app.use("/api/v1/absence", allRoutes.absenceRoutes);

// Use Examen Routes
app.use("/api/v1/examen", allRoutes.examenRoutes);
// Use Filiere Routes
app.use("/api/v1", allRoutes.filiereRoutes);
// Use groupe Routes
app.use("/api/v1", allRoutes.groupeRoutes);
// Use niveau Routes
app.use("/api/v1", allRoutes.niveauRoutes);
// Use etudiant Routes
app.use("/api/v1", allRoutes.etudiantRoute);

app.use("/api/v1", allRoutes.moduleRoutes);
app.use("/api/v1", allRoutes.coursRoutes);
// Use Ressource Routes
app.use("/api/v1", allRoutes.ressourceRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on PORT: ${PORT}`);
});
