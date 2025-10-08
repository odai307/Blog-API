const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if  user exists
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) return res.status(409).json({
            success: false,
            error: 'User with this email already exists'
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.createUser(firstName, lastName, email, hashedPassword);

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: newUser
        })

    } catch (err) {
        console.error('Error registering user', err);
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        // Get user by email
        const user = await userModel.getUserByEmail(email);
        if (!user) return res.status(401).json({
            success: false,
            error: 'Invalid email or password'
        });

        // Check if password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return res.status(401).json({
            success: false,
            error: 'Invalid email or password'
        });


        // Generate jwt token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );


        const { password: _, ...userWithoutPassword } = user;

        
        // Return token and user info
        return res.status(200).json({
            success: true,
            message: 'login successful',
            token,
            user: userWithoutPassword
        });

    } catch (err) {
        console.error('Error logging in user', err);
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}



const getCurrentUser = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.user.userId);

        if (!user) return res.status(404).json({
            success: false,
            error: 'User not found'
        });

        const { password: _, ...userWithoutPassword } = user;

        return res.status(200).json({
            success: true,
            user: userWithoutPassword
        })

    } catch (err) {
        console.error('Error getting current user', err);
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}



module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
}