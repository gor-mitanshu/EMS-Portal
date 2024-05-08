const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
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

router.post('/addEmployee', employeeController.addEmployee);

router.post('/addWorkDetails', verifyToken, employeeController.addWorkDetails);
router.get('/getWorkDetails', verifyToken, employeeController.getWorkDetails);
router.put('/updateWorkDetails/:id', verifyToken, employeeController.updateWorkDetails);

router.post('/addEducationdetails', verifyToken, employeeController.addEducationDetails);
router.get('/getEducationdetails', verifyToken, employeeController.getEducationDetails);
router.put('/updateEducationdetails/:id', verifyToken, employeeController.updateEducationDetails);
router.delete('/deleteEducationdetails/:id', verifyToken, employeeController.deleteEducationDetails);

router.post('/addFamilyDetails', verifyToken, employeeController.addFamilyDetails);
router.get('/getFamilyDetails', verifyToken, employeeController.getFamilyDetails);
router.put('/updateFamilyDetails/:id', verifyToken, employeeController.updateFamilyDetails);
router.delete('/deleteFamilyMemberDetails/:id', verifyToken, employeeController.deleteFamilyDetails);

router.post('/addEmergencyFamilyDetails', verifyToken, employeeController.emergencyaddFamilyDetails);
router.get('/getEmergencyFamilyDetails', verifyToken, employeeController.emergencygetFamilyDetails);
router.put('/updateEmergencyFamilyDetails/:id', verifyToken, employeeController.emergencyupdateFamilyDetails);
router.delete('/deleteEmergencyFamilyMemberDetails/:id', verifyToken, employeeController.emergencydeleteFamilyDetails);

router.post('/addDocument', verifyToken, upload.any(), employeeController.addDocuments);
router.get('/getDocument', verifyToken, employeeController.getDocuments);
router.post('/updateDocument/:id', verifyToken, upload.any(), employeeController.updateDocuments);
router.delete('/deleteDocument/:id', verifyToken, employeeController.deleteDocument);

router.post('/addCertificate', verifyToken, upload.any(), employeeController.addCertificate);
router.get('/getCertificate', verifyToken, employeeController.getCertificate);
router.post('/updateCertificate/:id', verifyToken, upload.any(), employeeController.updateCertificate);
router.delete('/deleteCertificate/:id', verifyToken, employeeController.deleteCertificate);

router.post('/addWorkDocument', verifyToken, upload.any(), employeeController.addWork);
router.get('/getWorkDocument', verifyToken, employeeController.getWork);
router.post('/updateWorkDocument/:id', verifyToken, upload.any(), employeeController.updateWork);
router.delete('/deleteWorkDocument/:id', verifyToken, employeeController.deleteWork);

module.exports = router;