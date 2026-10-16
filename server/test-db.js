const pool = require("./db");

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL connected successfully!");
    const [rows] = await connection.query("SELECT DATABASE() AS db");
    console.log("Database:", rows[0].db);
    connection.release();
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
  } finally {
    await pool.end();
  }
}

testConnection();