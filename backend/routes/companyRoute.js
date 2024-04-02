// --------------------------------Basic Imports--------------------------------
// importing express to build a web application that stores data in MongoDB.
const express = require('express');
// router 
const router = express.Router();
// user controller
const companyController = require('../controllers/companyController');
// Middleware
const verifyToken = require('../helpers/authMiddleware');

// All the list of routes
router.post('/signup', companyController.signup);

module.exports = router;