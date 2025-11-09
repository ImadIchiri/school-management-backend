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

// Use Planning Routes (exposes /api/v1/plannings/...)
app.use("/api/v1", allRoutes.planningRoutes);

// Use Absence Routes (exposes /api/v1/absence/...)
app.use("/api/v1/absence", allRoutes.absenceRoutes);

// Use Examen Routes (exposes /api/v1/examen/...)
app.use("/api/v1/examen", allRoutes.examenRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on PORT: ${PORT}`);
});

