const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
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

router.post('/addEmployee', employeeController.addEmployee);

router.post('/addWorkDetails/:id', verifyToken, employeeController.addWorkDetails);
router.get('/getWorkDetails/:id', verifyToken, employeeController.getWorkDetails);
router.put('/updateWorkDetails/:id', verifyToken, employeeController.updateWorkDetails);

router.post('/addEducationDetails/:id', verifyToken, employeeController.addEducationDetails);
router.get('/getEducationDetails/:id', verifyToken, employeeController.getEducationDetails);
router.put('/updateEducationDetails/:id', verifyToken, employeeController.updateEducationDetails);
router.delete('/deleteEducationDetails/:id', verifyToken, employeeController.deleteEducationDetails);

router.post('/addFamilyDetails/:id', verifyToken, employeeController.addFamilyDetails);
router.get('/getFamilyDetails/:id', verifyToken, employeeController.getFamilyDetails);
router.put('/updateFamilyDetails/:id', verifyToken, employeeController.updateFamilyDetails);
router.delete('/deleteFamilyMemberDetails/:id', verifyToken, employeeController.deleteFamilyDetails);

router.post('/addEmergencyFamilyDetails/:id', verifyToken, employeeController.emergencyaddFamilyDetails);
router.get('/getEmergencyFamilyDetails/:id', verifyToken, employeeController.emergencygetFamilyDetails);
router.put('/updateEmergencyFamilyDetails/:id', verifyToken, employeeController.emergencyupdateFamilyDetails);
router.delete('/deleteEmergencyFamilyMemberDetails/:id', verifyToken, employeeController.emergencydeleteFamilyDetails);

router.post('/addDocument/:id', verifyToken, upload.any(), employeeController.addDocuments);
router.get('/getDocument/:id', verifyToken, employeeController.getDocuments);
router.post('/updateDocument/:id', verifyToken, upload.any(), employeeController.updateDocuments);
router.delete('/deleteDocument/:id', verifyToken, employeeController.deleteDocument);

router.post('/addCertificate/:id', verifyToken, upload.any(), employeeController.addCertificate);
router.get('/getCertificate/:id', verifyToken, employeeController.getCertificate);
router.post('/updateCertificate/:id', verifyToken, upload.any(), employeeController.updateCertificate);
router.delete('/deleteCertificate/:id', verifyToken, employeeController.deleteCertificate);

router.post('/addWorkDocument/:id', verifyToken, upload.any(), employeeController.addWork);
router.get('/getWorkDocument/:id', verifyToken, employeeController.getWork);
router.post('/updateWorkDocument/:id', verifyToken, upload.any(), employeeController.updateWork);
router.delete('/deleteWorkDocument/:id', verifyToken, employeeController.deleteWork);

module.exports = router;