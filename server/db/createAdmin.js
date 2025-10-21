require('dotenv').config();
const bcrypt = require('bcrypt');
const { Pool } = require('pg');


const pool = new Pool({
  connectionString: process.env.DB_URL,
});

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const hashedPassword = await bcrypt.hash(password, 10);
  const username = "admin";

  try {
    const result = await pool.query(
      `INSERT INTO users (username, email, password, is_admin)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, is_admin`,
      [username, email, hashedPassword, true]
    );
    console.log("✅ Admin created:", result.rows[0]);
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
  } finally {
    await pool.end();
  }
}

createAdmin();
