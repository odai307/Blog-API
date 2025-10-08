const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DB_URL
});


pool.on('connect', () => {
  console.log("✅ Connected to PostgreSQL");
});

pool.on('error', (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});


module.exports = pool;