const pool = require('../db/pool');

// Create a comment
const createComment = async (userId, postId, content) => {
    try {
        const result = await pool.query(
            `INSERT INTO comments (user_id, post_id, content)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [userId, postId, content]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error creating comment', err);
        throw err;
    }
}


// Get all commments of a post by id
const getCommentsByPostId = async (postId) => {
    try {
        const result = await pool.query(
            `SELECT c.id, c.content, c.created_at, c.updated_at,
                u.first_name, u.last_name
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = $1
            ORDER BY c.updated_at DESC`,
            [postId]
        );
        return result.rows;
    } catch (err) {
        console.error('Error getting all comments by post', err);
        throw err;
    }
}


// Get a single comment by it's id
const getCommentById = async (id) => {
    try {
        const result = await pool.query(
            `SELECT c.id, c.content, c.created_at, c.updated_at,
                    c.user_id, c.post_id,
                    u.first_name, u.last_name
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.id = $1`,
            [id]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error getting comment by ID', err);
        throw err;
    }
};



// Update a comment by a user
const updateComment = async (id, userId, content) => {
    try {
        const result = await pool.query(
            `UPDATE comments
            SET content = $1, updated_at = CURRENT_TIMESTAMP
            WHERE id = $2 AND user_id = $3
            RETURNING *`,
            [content, id, userId]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error updating comment', err)
        throw err;
    }
}


// Delete a comment by a user
const deleteComment = async (id, userId) => {
    try {
        const result = await pool.query(
            `DELETE FROM comments
            WHERE id = $1 AND user_id = $2
            RETURNING *`,
            [id, userId]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error deleting comment', err);
        throw err;
    }
}

const deleteCommentAdmin = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM comments WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error deleting comment (admin)', err);
        throw err;
    }
};


module.exports = {
    createComment,
    getCommentsByPostId,
    getCommentById,
    updateComment,
    deleteComment,
    deleteCommentAdmin
}