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
router.post('/resendVerificationLink', companyController.resendVerificationLink);
router.post('/verify/:verificationToken', companyController.verifyEmail);
router.post('/signin', companyController.login);
router.post('/forgetpassword', companyController.forgetPassword);
router.post('/verifyOtp', companyController.verifyForgetPasswordOTP);
router.post('/resetPassword/:id/:token', companyController.resetPassword);

router.get('/getprofile', verifyToken, companyController.getPersonalDetailsOfUserFromToken);
router.put('/updateprofile/:id', verifyToken, companyController.updatePersonalDetailsOfUser);

module.exports = router;