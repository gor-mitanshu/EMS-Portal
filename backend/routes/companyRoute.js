const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
// Middleware
const verifyToken = require('../middleware/authMiddleware');

// File store process
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          const folderPath = './files/';
          // Check if the folder exists, if not, create it
          if (!fs.existsSync(folderPath)) {
               fs.mkdirSync(folderPath);
          }
          cb(null, folderPath);
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
router.get('/getCompanyDetailsByUserId/:id', verifyToken, companyController.getCompanyDetailsByUserId);
router.get('/getCompanyDetailsById/:id', verifyToken, companyController.getCompanyDetailsById);
router.put('/updateCompanyDetails/:id', verifyToken, companyController.updateCompanyDetails);
// Department
router.post('/addDepartment/:id', verifyToken, companyController.addDepartment);
router.get('/getDepartments/:id', verifyToken, companyController.getDepartments);
router.delete('/deleteDepartmentById/:id', verifyToken, companyController.deleteDepartmentById);
router.delete('/deleteSubDepartmentById/:id', verifyToken, companyController.deleteSubDepartmentById);
router.put('/updateDepartmentNameById/:id', verifyToken, companyController.updateDepartmentNameById);
router.put('/updateSubDepartmentNameById/:id', verifyToken, companyController.updateSubDepartmentNameById);
// Announcements
router.post('/addAnnouncement/:id', verifyToken, companyController.addAnnouncement);
router.get('/getAnnouncement/:id', verifyToken, companyController.getAnnouncement);
router.put('/updateAnnouncement/:id', verifyToken, companyController.updateAnnouncement);
router.delete('/deleteAnnouncement/:id', verifyToken, companyController.deleteAnnouncement);
// Policies
router.post('/addPolicy/:id', verifyToken, upload.any(), companyController.addPolicy);
router.get('/getPolicy/:id', verifyToken, companyController.getPolicy);
router.put('/updatePolicy/:id', verifyToken, upload.any(), companyController.updatePolicy);
router.delete('/deletePolicy/:id', verifyToken, companyController.deletePolicy);

module.exports = router;