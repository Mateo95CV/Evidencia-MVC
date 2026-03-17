<<<<<<< HEAD
import express from 'express';
import authRoutes from './src/routes/authRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
=======
import express from "express";
import { connectDB } from "./src/db/index.js";

const app = express();
const PORT = process.env.SRV_PORT;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
>>>>>>> 0af6b81ea7b333c7be11780ae416b1a1f213341a
