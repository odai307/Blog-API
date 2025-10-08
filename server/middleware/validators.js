const { body, param, validationResult } = require('express-validator');

// Middleware to check validation results

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    next();
}


// Auth validation
const registerValidation = [
    body('firstName')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ max: 50 }).withMessage('First name must be less than 50 characters'),
    
    body('lastName')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ max: 50 }).withMessage('Last name must be less than 50 characters'),
    
    body('email').
        trim()
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    
    body('password')
        .isLength({ min: 8 }).withMessage('Password should be at least 8 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[a-z]/).withMessage('Password should contain at least one lowercase character')
        .matches(/[A-Z]/).withMessage('Password should contain at least one uppercase character'),

    body('confirmPassword')
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error('Password do not match')
            }
            return true;
        }),

    validate
]


const loginValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    
    body('password')
        .notEmpty().withMessage('Password is required'),
    
    validate
];


// Post validators
const createPostValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 255 }).withMessage('Title must be less than 255 characters'),
    
    body('content')
        .trim()
        .notEmpty().withMessage('Content is required'),

    body('published')
        .optional()
        .isBoolean().withMessage('Published must be a boolean value'),
    
    validate
];

const updatePostValidation = [
    param('id')
        .isUUID().withMessage('Invalid post ID'),
    
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 255 }).withMessage('Title must be less than 255 characters'),
    
    body('content')
        .trim()
        .notEmpty().withMessage('Content is required'),
    
    body('published')
        .optional()
        .isBoolean().withMessage('Published must be a boolean value'),
    
    validate
];

const togglePublishValidation = [
    param('id')
        .isUUID().withMessage('Invalid post ID'),
    
    body('published')
        .optional()
        .isBoolean().withMessage('Published must be a boolean value'),
    
    validate
];

// Comment validators
const createCommentValidation = [
    param('postId')
        .isUUID()
        .withMessage('Invalid post ID'),
    
    body('content')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Comment content is required')
        .isLength({ max: 1000 })
        .withMessage('Comment must be less than 1000 characters'),
    
    validate
];

const updateCommentValidation = [
    param('id')
        .isUUID()
        .withMessage('Invalid comment ID'),
    
    body('content')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Comment content is required')
        .isLength({ max: 1000 })
        .withMessage('Comment must be less than 1000 characters'),
    
    validate
];

// ID parameter validation
const validateId = [
    param('id')
        .isUUID()
        .withMessage('Invalid ID format'),
    
    validate
];

const validatePostId = [
    param('postId')
        .isUUID()
        .withMessage('Invalid post ID'),
    validate
];


module.exports = {
    registerValidation,
    loginValidation,
    createPostValidation,
    updatePostValidation,
    togglePublishValidation,
    createCommentValidation,
    updateCommentValidation,
    validateId,
    validatePostId
}