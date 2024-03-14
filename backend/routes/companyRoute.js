// --------------------------------Basic Imports--------------------------------
// importing express to build a web application that stores data in MongoDB.
const express = require('express');
// router 
const router = express.Router();
// user controller
const companyController = require('../controllers/companyController');

// All the list of routes
router.post('/signup', companyController.signup);
router.post('/verify/:verificationToken', companyController.verify);
router.post('/signin', companyController.login);

module.exports = router;