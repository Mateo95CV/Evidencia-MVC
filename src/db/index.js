import pg from "pg";

export const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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