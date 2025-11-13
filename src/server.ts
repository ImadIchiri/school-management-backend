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

app.listen(PORT, () => {
  console.log(`Server is Running on PORT: ${PORT}`);
});
