// --------------------------------Basic Imports--------------------------------
// importing express to build a web application that stores data in MongoDB.
const express = require('express');
// router 
const router = express.Router();
// user controller
const companyController = require('../controllers/companyController');

// All the list of routes
router.post('/signup', companyController.signup);
router.post('/resendVerificationLink', companyController.resendVerificationLink);
router.post('/verify/:verificationToken', companyController.verifyEmail);
router.post('/signin', companyController.login);
router.post('/forgetpassword', companyController.forgetPassword);
router.post('/verifyOtp', companyController.verifyForgetPasswordOTP);
router.post('/resetPassword/:id/:token', companyController.resetPassword);

module.exports = router;