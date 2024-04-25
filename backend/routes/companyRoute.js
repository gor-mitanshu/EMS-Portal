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

// Overview
router.post('/addOverview', verifyToken, companyController.addOverview);
router.get('/getOverview', verifyToken, companyController.getOverview);
router.put('/updateOverview/:id', verifyToken, companyController.updateOverview);

// Company Address
router.post('/addCompanyAddress', verifyToken, companyController.addCompanyAddress);
router.get('/getCompanyAddress', verifyToken, companyController.getCompanyAddress);
router.put('/updateCompanyAddress/:id', verifyToken, companyController.updateCompanyAddress);

// Department
router.post('/addDepartment', verifyToken, companyController.addDepartment);

// Designation

// Announcements
router.post('/addAnnouncement', verifyToken, companyController.addAnnouncement);
router.get('/getAnnouncement', verifyToken, companyController.getAnnouncement);


// Policies
router.post('/addPolicy', verifyToken, companyController.addPolicy);
router.get('/getPolicy', verifyToken, companyController.getPolicy);
router.put('/updatePolicy/:id', verifyToken, companyController.updatePolicy);
router.delete('/deletePolicy/:id', verifyToken, companyController.deletePolicy);


module.exports = router;