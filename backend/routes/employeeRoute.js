// --------------------------------Basic Imports--------------------------------
// importing express to build a web application that stores data in MongoDB.
const express = require('express');
// router 
const router = express.Router();
// user controller
const employeeController = require('../controllers/employeeController');
// Middleware
const verifyToken = require('../middleware/authMiddleware');
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
router.post('/signup', employeeController.signup);

router.post('/addworkdetails', verifyToken, employeeController.addWorkDetails);
router.get('/getworkdetails', verifyToken, employeeController.getworkDetails);
router.put('/updateworkdetails/:id', verifyToken, employeeController.updateWorkDetails);

router.post('/addeducationdetails', verifyToken, employeeController.addEducationDetails);
router.get('/geteducationdetails', verifyToken, employeeController.getEducationDetails);
router.put('/updateeducationdetails/:id', verifyToken, employeeController.updateEducationDetails);
router.delete('/deletequalification/:id', verifyToken, employeeController.deleteEducationDetails);

router.post('/addFamilyDetails', verifyToken, employeeController.addFamilyDetails);
router.get('/getFamilyDetails', verifyToken, employeeController.getFamilyDetails);
router.put('/updateFamilyDetails/:id', verifyToken, employeeController.updateFamilyDetails);
router.delete('/deleteFamilyMemberDetails/:id', verifyToken, employeeController.deleteFamilyDetails);

router.post('/addemergencyFamilyDetails', verifyToken, employeeController.emergencyaddFamilyDetails);
router.get('/getemergencyFamilyDetails', verifyToken, employeeController.emergencygetFamilyDetails);
router.put('/updateemergencyFamilyDetails/:id', verifyToken, employeeController.emergencyupdateFamilyDetails);
router.delete('/deleteemergencyFamilyMemberDetails/:id', verifyToken, employeeController.emergencydeleteFamilyDetails);

router.post('/addDocument', verifyToken, upload.any(), employeeController.addDocuments);
router.get('/getDocument', verifyToken, employeeController.getDocuments);
router.post('/updateDocument/:id', verifyToken, upload.any(), employeeController.updateDocuments);
router.delete('/deleteDocument/:id', verifyToken, employeeController.deleteDocument);

router.post('/addCertificate', verifyToken, upload.any(), employeeController.addCertificate);
router.get('/getCertificate', verifyToken, employeeController.getCertificate);
router.post('/updateCertificate/:id', verifyToken, upload.any(), employeeController.updateCertificate);
router.delete('/deleteCertificate/:id', verifyToken, employeeController.deleteCertificate);

router.post('/addWork', verifyToken, upload.any(), employeeController.addWork);
router.get('/getWork', verifyToken, employeeController.getWork);
router.post('/updateWork/:id', verifyToken, upload.any(), employeeController.updateWork);
router.delete('/deleteWork/:id', verifyToken, employeeController.deleteWork);

module.exports = router;