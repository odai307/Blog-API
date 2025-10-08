const pool = require('../db/pool');


// Create a post
const createPost = async (userId, title, content, published=false) => {
    try {
        const result = await pool.query(
            `INSERT INTO posts (user_id, title, content, published)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [userId, title, content, published]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error creating post', err);
        throw err;
    }
}


// Get ALL posts (published and unpublished) - Admin only
const getAllPosts = async () => {
    try {
        const result = await pool.query(
            `SELECT p.id, p.title, p.content, p.published, p.created_at, p.updated_at,
                    u.first_name, u.last_name
            FROM posts p
            JOIN users u ON p.user_id = u.id
            ORDER BY p.created_at DESC`
        );
        return result.rows;
    } catch (err) {
        console.error('Error getting all posts', err);
        throw err;
    }
}

// Get all published posts
const getAllPublishedPosts = async () => {
    try {
        const result = await pool.query(
            `SELECT p.id, p.title, p.content, p.published, p.created_at, p.updated_at,
                    u.first_name, u.last_name
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.published = true
            ORDER BY p.created_at DESC`
        );
        return result.rows;
    } catch (err) {
        console.error('Error getting all published posts', err);
        throw err;
    }
}


const getAllUnpublishedPosts = async () => {
    try {
        const result = await pool.query(
            `SELECT p.id, p.title, p.content, p.published, p.created_at, p.updated_at,
                    u.first_name, u.last_name
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.published = false
            ORDER BY p.created_at DESC`
        );
        return result.rows;
    } catch (err) {
        console.error('Error getting all published posts', err);
        throw err;
    }
}

// Get a post by id
const getPostById = async (id) => {
    try {
        const result = await pool.query(`
            SELECT p.id, p.title, p.content, p.published, p.created_at, p.updated_at,
                    u.first_name, u.last_name
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.id = $1`,
        [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error getting post by id', err);
        throw err;
    }
}

// Update a post
const updatePost = async (id, title, content, published=false) => {
    try {
        const result = await pool.query(`
            UPDATE posts
            SET title = $1, content = $2, published = $3, updated_at = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING id, user_id, title, content, published, created_at, updated_at`,
        [title, content, published, id]
    );
        return result.rows[0];
    } catch (err) {
        console.error('Error updating post', err);
        throw err;
    }
}


// Toggle a post as published or unpublished
const togglePublish = async (id, publish) => {
    try {
        const result = await pool.query(
            `UPDATE posts
            SET published = $1
            WHERE id = $2
            RETURNING *`,
            [publish, id]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error toggling publish status', err);
        throw err;
    }
}


// Delete a post
const deletePost = async (id) => {
    try {
        const result = await pool.query(
            `DELETE FROM posts
            WHERE id = $1
            RETURNING *`,
            [id]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error deleting post', err);
        throw err;
    }
}


module.exports = {
    createPost,
    getAllPosts,
    getAllPublishedPosts,
    getAllUnpublishedPosts,
    getPostById,
    updatePost,
    togglePublish,
    deletePost
}