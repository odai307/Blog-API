const pool = require("./pool");

const seed = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Enable pgcrypto for gen_random_uuid()
    await client.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    // Drop tables in correct order due to foreign keys
    await client.query(`DROP TABLE IF EXISTS comments;`);
    await client.query(`DROP TABLE IF EXISTS posts;`);
    await client.query(`DROP TABLE IF EXISTS users;`);

    // Users table
    await client.query(`
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(20) DEFAULT 'user', -- 'admin' or 'user'
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

      );
    `);

    // Posts table
    await client.query(`
      CREATE TABLE posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Comments table
    await client.query(`
      CREATE TABLE comments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query("COMMIT");
    console.log("✅ Tables created successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Error creating tables:", err);
  } finally {
    client.release();
    process.exit(0);
  }
};

seed();
