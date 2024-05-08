const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
// Middleware
const verifyToken = require('../middleware/authMiddleware');

// File store process
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

// Company Details
router.post('/addCompanyDetails', verifyToken, companyController.addCompanyDetails);
router.get('/getCompanyDetails/:id', verifyToken, companyController.getCompanyDetails);
router.put('/updateCompanyDetails/:id', verifyToken, companyController.updateCompanyDetails);
// Company Address
router.post('/addCompanyAddress', verifyToken, companyController.addCompanyAddress);
router.get('/getCompanyAddress/:id', verifyToken, companyController.getCompanyAddress);
router.put('/updateCompanyAddress/:id', verifyToken, companyController.updateCompanyAddress);
// Department
router.post('/addDepartment', verifyToken, companyController.addDepartment);
// Announcements
router.post('/addAnnouncement', verifyToken, companyController.addAnnouncement);
router.get('/getAnnouncement', verifyToken, companyController.getAnnouncement);
// Policies
router.post('/addPolicy', verifyToken, upload.any(), companyController.addPolicy);
router.get('/getPolicy', verifyToken, companyController.getPolicy);
router.post('/updatePolicy/:id', verifyToken, upload.any(), companyController.updatePolicy);
router.delete('/deletePolicy/:id', verifyToken, companyController.deletePolicy);


module.exports = router;