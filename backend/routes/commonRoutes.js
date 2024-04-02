// --------------------------------Basic Imports--------------------------------
// importing express to build a web application that stores data in MongoDB.
const express = require('express');
// router 
const router = express.Router();
// user controller
const commonController = require('../controllers/commonController');
// Middleware
const verifyToken = require('../helpers/authMiddleware');

// All the list of routes
router.post('/resendVerificationLink', commonController.resendVerificationLink);
router.post('/verify/:verificationToken', commonController.verifyEmail);
router.post('/signin', commonController.login);
router.post('/forgetpassword', commonController.forgetPassword);
router.post('/verifyOtp', commonController.verifyForgetPasswordOTP);
router.post('/resetPassword/:id/:token', commonController.resetPassword);
router.get('/getprofile', verifyToken, commonController.getPersonalDetailsOfUserFromToken);

module.exports = router;