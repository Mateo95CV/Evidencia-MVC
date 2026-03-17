import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/index.js';

const authController = {
    register: async (req, res) => {
        try {
            const { nombre, email, password } = req.body;

            // Para que cumpla con todo
            if (!nombre || !email || !password ) {
                return res.status(400).json({ error: 'Todos los campos son requeridos' });
            }

            // Verifica que el usuario exista
            const userExists = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
            if (userExists.rows.length > 0) {
                return res.status(400).json({ error: 'El email ya esta registrado' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear usuario
            const result = await pool.query(
                'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email',
                [nombre, email, hashedPassword]
            );

            res.status(201).json({ 
                mensaje: 'Usuario registrado exitosamente',
                usuario: result.rows[0]
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error en el servidor' });
        }
    },

    // Login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email y contraseña requeridos' });
            }

            // Buscar usuario
            const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
            if (result.rows.length === 0) {
                return res.status(401).json({ error: 'Credenciales invalidas' });
            }

            const usuario = result.rows[0];

            // Verificar contraseña
            const passwordValida = await bcrypt.compare(password, usuario.password);
            if (!passwordValida) {
                return res.status(401).json({ error: 'Credenciales invalidas' });
            }

            // Generar token
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({ 
                mensaje: 'Sesion iniciada',
                token,
                usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error en el servidor' });
        }
    },

    // Logout
    logout: (req, res) => {
        res.json({ mensaje: 'Sesion cerrada' });
    },

    getProfile: async (req, res) => {
        try {
            const result = await pool.query('SELECT id, nombre, email FROM usuarios WHERE id = $1', [req.user.id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error en el servidor' });
        }
    },

    updateProfile: async (req, res) => {
        try {
            const { nombre, email } = req.body;
            const result = await pool.query(
                'UPDATE usuarios SET nombre = COALESCE($1, nombre), email = COALESCE($2, email) WHERE id = $3 RETURNING id, nombre, email',
                [nombre, email, req.user.id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }
};

export default authController;