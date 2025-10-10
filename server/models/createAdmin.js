// createAdmin.js
const pool = require('../db/pool');
const bcrypt = require('bcrypt')
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to ask questions one at a time
const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const createUserAdmin = async (firstName, lastName, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, role)
       VALUES ($1, $2, $3, $4, 'admin')
       RETURNING id, first_name, last_name, email, role, created_at`,
      [firstName, lastName, email, hashedPassword]
    );

    console.log('\n✅ Admin user created successfully:');
    console.table(result.rows);
  } catch (err) {
    console.error('\n❌ Error creating admin user:', err.message);
  } finally {
    pool.end();
    rl.close();
  }
};

const main = async () => {
  console.log('\n🧑‍💻 Create New Admin User\n---------------------------');

  const firstName = await askQuestion('First Name: ');
  const lastName = await askQuestion('Last Name: ');
  const email = await askQuestion('Email: ');
  const password = await askQuestion('Password: ');

  await createUserAdmin(firstName, lastName, email, password);
};

main();
