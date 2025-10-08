const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const validators = require('../middleware/validators');
const authMiddleware = require('../middleware/authMiddleware');


// Create a comment (requires authentication)
router.post('/post/:postId', authMiddleware.authenticateToken, validators.createCommentValidation, commentController.createComment);

// Get all comments for a post (public if post is published)
router.get('/post/:postId', authMiddleware.optionalAuth, validators.validatePostId, commentController.getCommentsByPostId);


// Update comment (requires authentication and only comment owner)
router.put('/:id', authMiddleware.authenticateToken, validators.updateCommentValidation, commentController.updateComment);


router.delete('/:id', authMiddleware.authenticateToken, validators.validateId, commentController.deleteComment)


module.exports = router;