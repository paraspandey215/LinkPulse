require("dotenv").config();
const mysql = require("mysql2/promise");

const required = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  throw new Error(
    `Missing database environment variables: ${missing.join(", ")}. Add them to server/.env.`
  );
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  queueLimit: 0,
});

module.exports = pool;
