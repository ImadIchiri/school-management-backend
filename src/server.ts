import express from "express";

const PORT = process.env.PORT || 8088;
const app = express();

app.listen(PORT, () => {
  console.log(`Server is Running on PORT: ${PORT}`);
});
