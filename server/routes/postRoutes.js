const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const validators = require('../middleware/validators');
const authMiddleware = require('../middleware/authMiddleware');


// Route to create post (admin only)
router.post('/', authMiddleware.authenticateToken, authMiddleware.requireAdmin, validators.createPostValidation, postController.createPost);

// Route to get all posts (admin only)
router.get('/', authMiddleware.authenticateToken, authMiddleware.requireAdmin, postController.getAllPosts);

// Route to get all published posts (public. Anyone can see)
router.get('/published', postController.getAllPublishedPosts);


// Route to get all unpublished posts (admin only)
router.get('/unpublished', authMiddleware.authenticateToken, authMiddleware.requireAdmin, postController.getAllUnpublishedPosts);


// Route to get a specific post (it can be both published and unpublished if for admin but should only be published for user)
router.get('/:id', authMiddleware.optionalAuth, validators.validateId, postController.getPostById);

// Route to update a post (admin only)
router.put('/:id', authMiddleware.authenticateToken, authMiddleware.requireAdmin, validators.updatePostValidation, postController.updatePost);

// Route to toggle a post into published or unpublished
router.patch('/:id/publish', authMiddleware.authenticateToken, authMiddleware.requireAdmin, validators.togglePublishValidation, postController.togglePublishPost);

// Route to delete a post
router.delete('/:id', authMiddleware.authenticateToken, authMiddleware.requireAdmin, validators.validateId, postController.deletePost);


module.exports = router;



