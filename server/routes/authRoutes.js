const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validators = require('../middleware/validators');
const authMiddleware = require('../middleware/authMiddleware');


// Protected route. Only login users can access
router.get('/me', authMiddleware.authenticateToken, authController.getCurrentUser);


// Public routes
router.post('/register', validators.registerValidation, authController.registerUser);
router.post('/login', validators.loginValidation, authController.loginUser)


module.exports = router;
