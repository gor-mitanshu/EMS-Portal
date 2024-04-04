// --------------------------------Basic Imports--------------------------------
// importing express to build a web application that stores data in MongoDB.
const express = require('express');
// router 
const router = express.Router();
// user controller
const employeeController = require('../controllers/employeeController');
// Middleware
const verifyToken = require('../helpers/authMiddleware');

// All the list of routes
router.post('/signup', employeeController.signup);
router.post('/addworkdetails', employeeController.addWorkDetails);
router.get('/getworkdetails', employeeController.getworkDetails);
router.put('/updateworkdetails/:id', employeeController.updateWorkDetails);

module.exports = router;