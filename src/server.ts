import express from "express";
import * as allRoutes from "./routes/index.js";

const PORT = process.env.PORT || 8088;
const app = express();

// For Express To Know We Are Using JSON
app.use(express.json());

// Use Event Routes
app.use("/api/v1", allRoutes.eventRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on PORT: ${PORT}`);
});
