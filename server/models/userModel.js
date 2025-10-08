const pool = require('../db/pool');

// Create a user
const createUser = async (firstName, lastName, email, password, role='user') => {
    try {
        const result = await pool.query(
            `INSERT INTO users (first_name, last_name, email, password, role)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, first_name, last_name, email, role, created_at`,
            [firstName, lastName, email, password, role]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error occured creating user', err);
        throw err;
    }
}


// Get user by email
const getUserByEmail = async (email) => {
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error getting user by email', err);
        throw err;
    }
}


// Get user by id
const getUserById = async (id) => {
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE id = $1`,
            [id]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error getting user by id', err);
        throw err;
    }
}


// delete a user
const deleteUser = async (id) => {
    try {
        const result = await pool.query(
            `DELETE FROM users WHERE id = $1
             RETURNING *`,
            [id]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Erro deleting user', err);
        throw err;
    }
}



module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    deleteUser
}