import express from "express";
import { connectDB } from "./src/db/index.js";

const app = express();
const PORT = process.env.SRV_PORT;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});