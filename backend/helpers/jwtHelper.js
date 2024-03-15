const jwt = require('jsonwebtoken');

// JWT secret key
const jwtSecret = process.env.JWT_SECRET;

// Function to generate JWT token
const generateToken = (payload, expiresIn = '1h') => {
     return jwt.sign(payload, jwtSecret, { expiresIn });
};

// Function to verify JWT token
const verifyToken = (token) => {
     try {
          return jwt.verify(token, jwtSecret);
     } catch (err) {
          throw err;
     }
};

module.exports = { generateToken, verifyToken };
