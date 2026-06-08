import pg from "pg";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync("./certs/ca.pem", "utf8"),
    rejectUnauthorized: true,
  },
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL Connected");
    client.release();
  } catch (error) {
    console.error("Database Connection Error:", error);
    process.exit(1);
  }
};