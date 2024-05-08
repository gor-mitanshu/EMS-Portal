const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// Middleware
const verifyToken = require('../middleware/authMiddleware');

router.post('/addUser', userController.addUser);
router.get('/getUserDetails', verifyToken, userController.getUserDetails);
router.put('/updateUserDetails/:id', verifyToken, userController.updateUserDetails);
router.post('/sendVerificationLink', userController.sendVerificationLink);
router.post('/emailVerification/:verificationToken', userController.verifyEmail);
router.post('/loginUser', userController.loginUser);
router.post('/forgetPassword', userController.forgetPassword);
router.post('/verifyOtp', userController.verifyOTP);
router.post('/resetPassword/:id/:token', userController.resetPassword);

module.exports = router;