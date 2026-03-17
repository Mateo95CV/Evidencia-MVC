import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/index.js";
import { users } from "../models/userModel.js";

export const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Para que cumpla con todo
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: "Todos los campos son requeridos" });
      }

      // Verifica que el usuario exista
      const userExists = await pool.query(users.getUserByEmail, [email]);
      if (userExists.rows.length > 0) {
        return res.status(400).json({ error: "El email ya esta registrado" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear usuario
      const result = await pool.query(users.postUser, [
        name,
        email,
        hashedPassword,
      ]);

      res.status(201).json({
        mensaje: "Usuario registrado exitosamente",
        usuario: result.rows[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña requeridos" });
      }

      const result = await pool.query(users.getUserByEmail, [email]);
      const user = result.rows[0];

      // 2. Verificar si el usuario existe
      if (!user) {
        return res.status(401).json({ error: "Credenciales invalidas" });
      }

      // 3. Comparar la contraseña enviada con el hash de la BD
      const passwordValida = await bcrypt.compare(password, user.password);

      if (!passwordValida) {
        return res.status(401).json({ error: "Credenciales invalidas" });
      }

      res.json({
        mensaje: "Sesion iniciada",
        usuario: { id: user.id, nombre: user.nombre, email: user.email },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Logout
  logout: (req, res) => {
    res.json({ mensaje: "Sesion cerrada" });
  },
};
