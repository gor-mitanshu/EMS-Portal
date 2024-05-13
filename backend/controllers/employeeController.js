// configuring dotenv
require('dotenv').config();
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongoose').Types;
const fs = require('fs');
const path = require('path');

const UserSchema = require('../models/userSchema/userSchema');
const EmployeeSchema = require('../models/employeeSchema/employeeSchema');
const EducationSchema = require('../models/userSchema/educationSchema');
const FamilyMemberSchema = require('../models/userSchema/familyMemberSchema');
const EmergencyFamilyMemberSchema = require('../models/userSchema/emergencyFamilySchema');
const DocumentSchema = require('../models/userSchema/documentIdSchema');
const CertificateSchema = require('../models/userSchema/certificateSchema');
const WorkSchema = require('../models/userSchema/workSchema');

const employeeController = {
     addEmployee: async (req, res) => {
          try {
               let { name, email, phone, password, birth_date, gender, blood_group, marital_status } = req.body;
               let { company_name, register_office, company_size, employee_no, inTime, out_time, garce_time, working_hours } = req.body;
               const oldUser = await UserSchema.findOne({ email })
               if (!!oldUser) {
                    return res.status(409).send({
                         message: "User already exists",
                    });
               }
               const hashedPassword = await bcrypt.hash(password, 10);
               let image = '';
               if (req.file) {
                    image = req.file.filename;
               }
               const newUserCommonSchema = new UserSchema({
                    name, email, phone, password: hashedPassword, birth_date, gender, blood_group, marital_status, image, role: "employee"
               });
               await newUserCommonSchema.save();
               const newUserCompanyUser = new EmployeeSchema({
                    user_id: newUserCommonSchema._id,
                    company_name, register_office, company_size, employee_no, set_time_shift: { inTime, out_time, garce_time, working_hours }
               });
               await newUserCompanyUser.save();
               res.status(201).send({
                    message: "Registered Successfully",
               });
          } catch (error) {
               res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     // Work
     addWorkDetails: async (req, res) => {
          const { id } = req.params;
          let { employee_code, date_of_joining, probation_period, employment_type, work_location, employee_status, work_experience } = req.body;
          try {
               const workDetails = new EmployeeSchema({
                    employee_code, date_of_joining, probation_period, employment_type, work_location, employee_status, work_experience, role: "employee", user_id: id
               });
               await workDetails.save();
               res.status(200).send({
                    message: "Added Successfully",
               });
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     getWorkDetails: async (req, res) => {
          try {
               const { id } = req.params
               const workDetails = await EmployeeSchema.findOne({ user_id: id })
               if (workDetails) {
                    return res.status(200).send({
                         workDetails,
                    });
               } else {
                    return res.status(200).send({
                         message: "Didn't find the User",
                    });
               }
          } catch (error) {
               return res.status(500).send({
                    message: "Internal server error", error: error.message,
               });
          }
     },

     updateWorkDetails: async (req, res) => {
          const { id } = req.params;
          try {
               const {
                    employee_code,
                    date_of_joining,
                    probation_period,
                    employment_type,
                    work_location,
                    employee_status,
                    work_experience,
                    designation,
                    job_title,
                    department,
                    sub_department,
                    resignation_date,
                    resignation_status,
                    notice_period,
                    last_working_day
               } = req.body;

               const updateFields = {
                    employee_code,
                    date_of_joining,
                    probation_period,
                    employment_type,
                    work_location,
                    employee_status,
                    work_experience,
                    designation,
                    job_title,
                    department,
                    sub_department,
                    resignation_date,
                    resignation_status,
                    notice_period,
                    last_working_day,
               }
               const updatedEmployee = await EmployeeSchema.findOneAndUpdate(
                    { _id: id },
                    { $set: updateFields },
                    { new: true }
               );
               if (!updatedEmployee) {
                    return res.status(500).send({
                         error: "Update Unsuccessful",
                         success: false,
                    });
               } else {
                    return res.status(200).send({
                         message: "Update Successful",
                         updatedEmployee,
                         success: true,
                    });
               }
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     // Education
     addEducationDetails: async (req, res) => {
          const { id } = req.params;
          let {
               qualification_type,
               course_name,
               course_type,
               course_stream,
               course_start_date,
               course_end_date,
               college_name,
               university_name,
          } = req.body;
          try {
               const educationDetails = new EducationSchema({
                    user_id: id,
                    qualification_type,
                    course_name,
                    course_type,
                    course_stream,
                    course_start_date,
                    course_end_date,
                    college_name,
                    university_name,

               });
               await educationDetails.save();
               res.status(200).send({
                    message: "Added Successfully",
               });
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     getEducationDetails: async (req, res) => {
          try {
               const { id } = req.params;
               const educationData = await EducationSchema.find({ user_id: id });
               if (educationData) {
                    return res.status(200).send({
                         educationData,
                    });
               } else {
                    return res.status(200).send({
                         message: "Didn't find the User",
                    });
               }
          } catch (error) {
               return res.status(500).send({
                    message: "Internal server error",
                    error: error.message,
               });
          }
     },

     updateEducationDetails: async (req, res) => {
          try {
               const { id } = req.params
               const {
                    qualification_type,
                    course_name,
                    course_type,
                    course_stream,
                    course_start_date,
                    course_end_date,
                    college_name,
                    university_name,
               } = req.body;

               const updateFields = {
                    qualification_type,
                    course_name,
                    course_type,
                    course_stream,
                    course_start_date,
                    course_end_date,
                    college_name,
                    university_name,
               }
               const updatedQualification = await EducationSchema.findOneAndUpdate(
                    {
                         _id: id,
                    },
                    { $set: updateFields },
                    { new: true }
               );
               if (!updatedQualification) {
                    return res.status(500).send({
                         error: "Update Unsuccessful",
                    });
               } else {
                    return res.status(200).send({
                         message: "Updated Successfully",
                    });
               }
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     deleteEducationDetails: async (req, res) => {
          try {
               const { id } = req.params;
               const deletedQualification = await EducationSchema.findByIdAndDelete({ _id: id });
               if (!deletedQualification) {
                    return res.status(404).json({ message: "Deleted unsuccessfully" });
               }
               return res.status(200).json({ message: "Deleted successfully" });
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     // Family
     addFamilyDetails: async (req, res) => {
          const { id } = req.params;
          let {
               family_name,
               family_relationship,
               family_birth_date,
               dependant
          } = req.body;
          try {
               const familyDetails = new FamilyMemberSchema({
                    user_id: id,
                    family_name,
                    family_relationship,
                    family_birth_date,
                    dependant,
               });
               await familyDetails.save();
               res.status(200).send({
                    message: "Added Successfully",
               });
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     getFamilyDetails: async (req, res) => {
          try {
               const { id } = req.params;
               const familyDetails = await FamilyMemberSchema.find({ user_id: id })
               if (familyDetails) {
                    return res.status(200).send({
                         familyDetails,
                    });
               } else {
                    return res.status(200).send({
                         message: "Didn't find the User",
                    });
               }
          } catch (error) {
               return res.status(500).send({
                    message: "Internal server error",
                    error: error.message,
               });
          }
     },

     updateFamilyDetails: async (req, res) => {
          try {
               const { id } = req.params;
               const {
                    family_name,
                    family_relationship,
                    family_birth_date,
                    dependant
               } = req.body;

               const updatedFields = {
                    family_name,
                    family_relationship,
                    family_birth_date,
                    dependant
               }

               const updatedFamilyMember = await FamilyMemberSchema.findOneAndUpdate(
                    { _id: id },
                    { $set: updatedFields },
                    { new: true }
               )
               if (!updatedFamilyMember) {
                    return res.status(500).send({
                         error: "Update Unsuccessful",
                    });
               } else {
                    return res.status(200).send({
                         message: "Updated Successfully",
                    });
               }
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     deleteFamilyDetails: async (req, res) => {
          try {
               const { id } = req.params;
               const deleteFamilyMemberDetails = await FamilyMemberSchema.findOneAndDelete({ _id: id })
               if (!deleteFamilyMemberDetails) {
                    return res.status(404).json({ message: "Family Member Details not found" });
               }
               return res.status(200).json({ message: "Deleted successfully" });

          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     emergencyaddFamilyDetails: async (req, res) => {
          const { id } = req.params;
          let {
               family_name,
               family_relationship,
               family_birth_date,
               dependant
          } = req.body;
          try {
               const emergencyFamilyData = new EmergencyFamilyMemberSchema({
                    user_id: id,
                    family_name,
                    family_relationship,
                    family_birth_date,
                    dependant,

               });
               await emergencyFamilyData.save();
               res.status(200).send({
                    message: "Added Successfully",
               });
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     emergencygetFamilyDetails: async (req, res) => {
          try {
               const { id } = req.params;
               const familyDetails = await EmergencyFamilyMemberSchema.find({ user_id: id })
               if (familyDetails) {
                    return res.status(200).send({
                         familyDetails,
                    });
               } else {
                    return res.status(200).send({
                         message: "Didn't find the User",
                    });
               }
          } catch (error) {
               return res.status(500).send({
                    message: "Internal server error",
                    error: error.message,
               });
          }
     },

     emergencyupdateFamilyDetails: async (req, res) => {
          try {
               const { id } = req.params;

               const {
                    family_name,
                    family_relationship,
                    family_birth_date,
                    dependant
               } = req.body;

               const updatedFields = {
                    family_name,
                    family_relationship,
                    family_birth_date,
                    dependant
               }

               const updatedFamilyMember = await EmergencyFamilyMemberSchema.findOneAndUpdate(
                    { _id: id },
                    { $set: updatedFields },
                    { new: true }
               )
               if (!updatedFamilyMember) {
                    return res.status(500).send({
                         error: "Update Unsuccessful",
                    });
               } else {
                    return res.status(200).send({
                         message: "Updated Successfully",
                    });
               }
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     emergencydeleteFamilyDetails: async (req, res) => {
          try {
               const { id } = req.params;
               const deleteFamilyMemberDetails = await EmergencyFamilyMemberSchema.findOneAndDelete({ _id: id })
               if (!deleteFamilyMemberDetails) {
                    return res.status(404).json({ message: "Family Member Details not found" });
               }
               return res.status(200).json({ message: "Deleted successfully" });
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     // Documents
     addDocuments: async (req, res) => {
          const { id } = req.params;
          let {
               document_type,
               document_id,
               proof,
          } = req.body;
          const proofObject = JSON.parse(proof);
          try {
               let file = '';
               if (req.files && req.files.length > 0) {
                    file = req.files[0].filename;
               }
               const documentData = new DocumentSchema({
                    user_id: id,
                    document_type,
                    document_id,
                    photo_id: proofObject.photo_id,
                    date_of_birth: proofObject.date_of_birth,
                    current_address: proofObject.current_address,
                    permanent_address: proofObject.permanent_address,
                    document_file: file,

               });
               await documentData.save();
               res.status(200).send({
                    message: "Added Successfully",
               });
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     getDocuments: async (req, res) => {
          try {
               const { id } = req.params;
               const documentData = await DocumentSchema.find({ user_id: id })
               if (documentData) {
                    return res.status(200).send({
                         documentData,
                    });
               } else {
                    return res.status(200).send({
                         message: "Didn't find the Document",
                    });
               }
          } catch (error) {
               return res.status(500).send({
                    message: "Internal server error",
                    error: error.message,
               });
          }
     },

     updateDocuments: async (req, res) => {
          try {
               const { id } = req.params;
               const {
                    document_type,
                    document_id,
                    proof
               } = req.body;

               let document_file = '';

               // Check if a new file was uploaded
               if (req.files && req.files.length > 0) {
                    document_file = req.files[0].filename;

                    // Delete the old file
                    const existingDocument = await DocumentSchema.findById({ _id: id });
                    if (existingDocument && existingDocument.document_file) {
                         const filePath = path.join('images', existingDocument.document_file);
                         if (fs.existsSync(filePath)) {
                              fs.unlinkSync(filePath);
                         }
                    }
               } else {
                    // No new file uploaded, keep the existing file
                    const existingDocument = await DocumentSchema.findById({ _id: id });
                    if (existingDocument) {
                         document_file = existingDocument.document_file;
                    }
               }
               const proofObject = JSON.parse(proof);
               const updatedFields = {
                    document_type,
                    document_id,
                    photo_id: proofObject.photo_id,
                    date_of_birth: proofObject.date_of_birth,
                    current_address: proofObject.current_address,
                    permanent_address: proofObject.permanent_address,
                    document_file
               };

               const updatedDocument = await DocumentSchema.findOneAndUpdate(
                    { _id: id },
                    { $set: updatedFields },
                    { new: true }
               )
               if (!updatedDocument) {
                    return res.status(500).send({
                         error: "Update Unsuccessful",
                    });
               } else {
                    return res.status(200).send({
                         message: "Updated Successfully",
                    });
               }
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     deleteDocument: async (req, res) => {
          try {
               const { id } = req.params;
               const deletedDocument = await DocumentSchema.findByIdAndDelete({ _id: id });

               if (!deletedDocument) {
                    return res.status(404).json({ success: false, message: "Document not found" });
               }

               // Delete the associated file
               const filePath = path.join(__dirname, 'images', deletedDocument.document_file);
               if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
               }

               return res.status(200).json({ message: "Deleted successfully" });

          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     // Certificate
     addCertificate: async (req, res) => {
          const { id } = req.params;
          let {
               certificate_name,
               certificate_title,
          } = req.body;
          try {
               let file = '';
               if (req.files && req.files.length > 0) {
                    file = req.files[0].filename;
               }
               const certificateData = new CertificateSchema({
                    user_id: id,
                    certificate_name,
                    certificate_title,
                    certificate_file: file,

               });
               await certificateData.save();
               res.status(200).send({
                    message: "Added Successfully",
               });
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     getCertificate: async (req, res) => {
          try {
               const { id } = req.params;
               const certificateData = await CertificateSchema.find({ user_id: id })
               if (certificateData) {
                    return res.status(200).send({
                         certificateData,
                    });
               } else {
                    return res.status(200).send({
                         message: "Didn't find the User",
                    });
               }
          } catch (error) {
               return res.status(500).send({
                    message: "Internal server error",
                    error: error.message,
               });
          }
     },

     updateCertificate: async (req, res) => {
          try {
               const { id } = req.params;
               const {
                    certificate_name,
                    certificate_title,
               } = req.body;

               let certificate_file = '';

               // Check if a new file was uploaded
               if (req.files && req.files.length > 0) {
                    certificate_file = req.files[0].filename;

                    // Delete the old file
                    const existingCertificate = await CertificateSchema.findById({ _id: id });
                    if (existingCertificate && existingCertificate.certificate_file) {
                         const filePath = path.join('images', existingCertificate.certificate_file);
                         if (fs.existsSync(filePath)) {
                              fs.unlinkSync(filePath);
                         }
                    }
               } else {
                    // No new file uploaded, keep the existing file
                    const existingCertificate = await CertificateSchema.findById({ _id: id });
                    if (existingCertificate) {
                         certificate_file = existingCertificate.certificate_file;
                    }
               }
               const updatedFields = {
                    certificate_name,
                    certificate_title,
                    certificate_file
               }
               const updatedDocument = await CertificateSchema.findOneAndUpdate(
                    { _id: id },
                    { $set: updatedFields },
                    { new: true }
               )
               if (!updatedDocument) {
                    return res.status(500).send({
                         error: "Update Unsuccessful",
                    });
               } else {
                    return res.status(200).send({
                         message: "Updated Successfully",
                    });
               }
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     deleteCertificate: async (req, res) => {
          try {
               const { id } = req.params;
               const deletedCertificate = await CertificateSchema.findByIdAndDelete({ _id: id });
               if (!deletedCertificate) {
                    return res.status(404).json({ message: "Document not found" });
               }

               // Delete the associated file
               const filePath = path.join(__dirname, 'images', deletedCertificate.certificate_file);
               if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
               }
               return res.status(200).json({ message: "Deleted successfully" });
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     // Work
     addWork: async (req, res) => {
          const { id } = req.params;
          let {
               work_name,
               work_description,
          } = req.body;
          try {
               let file = '';
               if (req.files && req.files.length > 0) {
                    file = req.files[0].filename;
               }
               const workData = new WorkSchema({
                    user_id: id,
                    work_name,
                    work_description,
                    work_file: file,

               });
               await workData.save();
               res.status(200).send({
                    message: "Added Successfully",
               });
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     getWork: async (req, res) => {
          try {
               const { id } = req.params;
               const workData = await WorkSchema.find({ user_id: id })
               if (workData) {
                    return res.status(200).send({
                         workData,
                    });
               } else {
                    return res.status(200).send({
                         message: "Didn't find the User",
                    });
               }
          } catch (error) {
               return res.status(500).send({
                    message: "Internal server error",
                    error: error.message,
               });
          }
     },

     updateWork: async (req, res) => {
          try {
               const { id } = req.params;
               const {
                    work_name,
                    work_description,
               } = req.body;

               let work_file = '';
               // Check if a new file was uploaded
               if (req.files && req.files.length > 0) {
                    work_file = req.files[0].filename;

                    // Delete the old file
                    const existingWork = await WorkSchema.findById({ _id: id });
                    if (existingWork && existingWork.work_file) {
                         const filePath = path.join('images', existingWork.work_file);
                         if (fs.existsSync(filePath)) {
                              fs.unlinkSync(filePath);
                         }
                    }
               } else {
                    // No new file uploaded, keep the existing file
                    const existingWork = await WorkSchema.findById({ _id: id });
                    if (existingWork) {
                         work_file = existingWork.work_file;
                    }
               }

               const updatedFields = {
                    work_name,
                    work_description,
                    work_file
               }

               const updatedDocument = await WorkSchema.findOneAndUpdate(
                    { _id: id },
                    { $set: updatedFields },
                    { new: true }
               )
               if (!updatedDocument) {
                    return res.status(500).send({
                         error: "Update Unsuccessful",
                    });
               } else {
                    return res.status(200).send({
                         message: "Updated Successfully",
                    });
               }
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     },

     deleteWork: async (req, res) => {
          try {
               const { id } = req.params;
               const deletedCertificate = await WorkSchema.findByIdAndDelete({ _id: id });
               if (!deletedCertificate) {
                    return res.status(404).json({ message: "Document not found" });
               }

               // Delete the associated file
               const filePath = path.join(__dirname, 'images', deletedCertificate.work_file);
               if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
               }

               return res.status(200).json({ message: "Deleted successfully" });

          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
               });
          }
     }
};

module.exports = employeeController;
