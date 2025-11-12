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

app.use("/api/v1", allRoutes.userRoutes);
app.use("/api/v1", allRoutes.candidatRoutes);
app.use("/api/v1", allRoutes.employeRoutes);
app.use("/api/v1", allRoutes.enseignantRoutes);
app.use("/api/v1", allRoutes.etudiantRoutes);
app.use("/api/v1", allRoutes.parentRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on PORT: ${PORT}`);
});
