const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    // Get token from authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({
        success: false,
        error: 'Access denied. No token provided'
    });

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to request object
        req.user = {
            userId: decoded.userId,
            role: decoded.role
        }
        next();
    } catch(err) {
        console.error('Token invalid or expired');
        res.status(403).json({
            success: false,
            error: 'Token invalid or expired'
        })
    }
}



// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
    // This middleware should run after authenticateToken
    if (!req.user) return res.status(401).json({
        success: false,
        error: 'Authentication required'
    });

    if (req.user.role !== 'admin') return res.status(403).json({
        success: false,
        error: 'Access denied. Admin priveleges required'
    });

    next();
}

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return next();

  const token = authHeader.split(' ')[1];
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // now req.user will be available in controllers
  } catch (err) {
    console.warn('Invalid or expired token, continuing without user context');
  }

  next();
};


module.exports = {
    authenticateToken,
    requireAdmin,
    optionalAuth
}