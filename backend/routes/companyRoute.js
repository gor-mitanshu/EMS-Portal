// --------------------------------Basic Imports--------------------------------
// importing express to build a web application that stores data in MongoDB.
const express = require('express');
// router 
const router = express.Router();
// user controller
const companyController = require('../controllers/companyController');
// Middleware
const verifyToken = require('../helpers/authMiddleware');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, './images/');
     },
     filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const fileExtension = path.extname(file.originalname);
          const fileName = uniqueSuffix + fileExtension;
          cb(null, fileName);
     }
});
const upload = multer({
     storage: storage,
     limits: {
          fileSize: 1024 * 1024 * 5
     }
});

// All the list of routes
router.post('/signup', companyController.signup);

// Overview
router.post('/addOverview', verifyToken, companyController.addOverview);
router.get('/getOverview/:id', verifyToken, companyController.getOverview);
router.put('/updateOverview/:id', verifyToken, companyController.updateOverview);

// Company Address
router.post('/addCompanyAddress', verifyToken, companyController.addCompanyAddress);
router.get('/getCompanyAddress/:id', verifyToken, companyController.getCompanyAddress);
router.put('/updateCompanyAddress/:id', verifyToken, companyController.updateCompanyAddress);

// Department
router.post('/addDepartment', verifyToken, companyController.addDepartment);

// Designation

// Announcements
router.post('/addAnnouncement', verifyToken, companyController.addAnnouncement);
router.get('/getAnnouncement', verifyToken, companyController.getAnnouncement);


// Policies
router.post('/addPolicy', verifyToken, upload.any(), companyController.addPolicy);
router.get('/getPolicy', verifyToken, companyController.getPolicy);
router.post('/updatePolicy/:id', verifyToken, upload.any(), companyController.updatePolicy);
router.delete('/deletePolicy/:id', verifyToken, companyController.deletePolicy);


module.exports = router;