const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming Mongoose User model

// Middleware for authentication
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract Bearer token
    if (!token) return res.status(401).send({ error: 'No token provided' }); // Check if token exists

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the decoded token's id
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).send({ error: 'User not found' }); // Handle user not found

    req.user = user; // Attach user to request object for further use
    next(); // Proceed to the next middleware
  } catch (err) {
    res.status(401).send({ error: 'Invalid or expired token' }); // Handle token verification error
  }
};

// Middleware for role-based access control (RBAC)
const roleCheck = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Permission denied' }); // Role mismatch
  }
  next(); // Proceed if user has the correct role
};

module.exports = { auth, roleCheck }; // Export both middlewares
