<<<<<<< HEAD
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
=======
import pg from "pg";

export const pool = new pg.Pool({
>>>>>>> 0af6b81ea7b333c7be11780ae416b1a1f213341a
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
<<<<<<< HEAD
    database: process.env.DB_NAME,
});

export default pool;
=======
    database: process.env.DB_NAME
});

export const connectDB = async () => {
    try {
        await pool.connect();
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}
>>>>>>> 0af6b81ea7b333c7be11780ae416b1a1f213341a
