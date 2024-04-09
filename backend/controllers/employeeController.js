// configuring dotenv
require('dotenv').config();
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongoose').Types;

// Importing models
const CommonSchema = require('../models/commonSchema/userSchema').UserModel;
const EmployeeSchema = require('../models/employeeSchema/employeeSchema');
const EducationSchema = require('../models/commonSchema/educationSchema');
const QualificationSchema = require('../models/commonSchema/qualificationSchema');
const FamilySchema = require('../models/commonSchema/familySchema');
const FamilyMemberSchema = require('../models/commonSchema/familyMember');
const EmergencyFamilyMemberSchema = require('../models/commonSchema/emergencyFamilyMember');

// List of the controllers
const employeeController = {
     signup: async (req, res) => {
          try {
               // getting the body part from request
               let { name, email, phone, password, birth_date, gender, blood_group, marital_status } = req.body;
               let { company_name, register_office, company_size, employee_no, inTime, out_time, garce_time, working_hours } = req.body;

               // Check if user already exists
               const oldUser = await CommonSchema.findOne({ email })
               if (!!oldUser) {
                    return res.status(409).send({
                         message: "Already Registered",
                         success: false,
                         data: null
                    });
               }
               const hashedPassword = await bcrypt.hash(password, 10);
               let image = '';
               if (req.file) {
                    image = req.file.filename;
               }

               // Create a new user in the CommonSchema
               const newUserCommonSchema = new CommonSchema({
                    name, email, phone, password: hashedPassword, birth_date, gender, blood_group, marital_status, image, role: "employee"
               });
               await newUserCommonSchema.save();

               // Create a new user in the EmployeeSchema
               const newUserCompanyUser = new EmployeeSchema({
                    user_id: newUserCommonSchema._id, // Assign the user ID from CommonSchema

                    company_name, register_office, company_size, employee_no, set_time_shift: { inTime, out_time, garce_time, working_hours }
               });
               await newUserCompanyUser.save();

               res.status(201).send({
                    message: "Registered Successfully",
                    success: true,
                    data: { newUserCommonSchema, newUserCompanyUser }
               });

          } catch (error) {
               console.error(error);
               res.status(500).send({
                    message: "Internal Server Error",
                    success: false,
                    data: null
               });
          }
     },

     addWorkDetails: async (req, res) => {
          let { employee_code, date_of_joining, probation_period, employment_type, work_location, employee_status, work_experience, user_id } = req.body;
          try {
               const workDetails = new EmployeeSchema({
                    employee_code, date_of_joining, probation_period, employment_type, work_location, employee_status, work_experience, role: "employee", user_id
               });
               await workDetails.save();

               res.status(200).send({
                    message: "Added Successfully",
                    success: true,
                    workDetails
               });
          } catch (error) {
               console.log(error);
               return res.status(500).send({
                    error: "Internal Server Error",
                    success: false,
                    technicalError: error.message
               });
          }
     },

     getworkDetails: async (req, res) => {
          try {
               const token = req.headers.authorization;
               if (!token) {
                    return res.status(500).send({
                         error: "Token not found",
                         success: false
                    });
               }
               const { user } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
               if (!user) {
                    return res.status(404).send({
                         message: "Unable to parse the token",
                         success: false,
                         error: res.message
                    });
               }
               const workDetails = await EmployeeSchema.findOne({ user_id: user._id })
               if (workDetails) {
                    return res.status(200).send({
                         message: "Got the User",
                         success: true,
                         workDetails,
                    });
               } else {
                    return res.status(200).send({
                         message: "Didn't find the User",
                         res,
                         success: false,
                    });
               }
          } catch (error) {
               console.error('Error getting user:', error.message);
               return res.status(500).send({
                    message: "Internal server error",
                    error: error.message,
                    success: false
               });
          }
     },

     updateWorkDetails: async (req, res) => {
          try {
               const token = req.headers.authorization;
               if (!token) {
                    return res.status(500).send({
                         error: "Token not found",
                         success: false
                    });
               }
               const { user } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
               if (!user) {
                    return res.status(404).send({
                         message: "Unable to parse the token",
                         success: false,
                         error: res.message
                    });
               }
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
                    { user_id: user._id },
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
               console.log(error);
               return res.status(500).send({
                    error: "Internal Server Error",
                    success: false,
                    technicalError: error.message
               });
          }
     },

     addEducationDetails: async (req, res) => {
          const token = req.headers.authorization;
          if (!token) {
               return res.status(500).send({
                    error: "Token not found",
                    success: false
               });
          }
          const { user } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
          if (!user) {
               return res.status(404).send({
                    message: "Unable to parse the token",
                    success: false,
                    error: res.message
               });
          }
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
               let educationDetails = await EducationSchema.findOne({ user_id: user._id });

               if (!educationDetails) {
                    // Create a new education record if it doesn't exist
                    educationDetails = new EducationSchema({
                         user_id: user._id,
                         deleted_at: null
                    });
                    await educationDetails.save();
               }

               // Create a new qualification record associated with the education record
               const newQualification = new QualificationSchema({
                    education_id: educationDetails._id,
                    qualification_type,
                    course_name,
                    course_type,
                    course_stream,
                    course_start_date,
                    course_end_date,
                    college_name,
                    university_name,
                    deleted_at: null
               });
               await newQualification.save();

               res.status(200).send({
                    message: "Added Successfully",
                    success: true,
                    educationDetails,
                    newQualification
               });
          } catch (error) {
               console.log(error);
               return res.status(500).send({
                    error: "Internal Server Error",
                    success: false,
                    technicalError: error.message
               });
          }
     },

     getEducationDetails: async (req, res) => {
          try {
               const token = req.headers.authorization;
               if (!token) {
                    return res.status(500).send({
                         error: "Token not found",
                         success: false
                    });
               }
               const { user } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
               if (!user) {
                    return res.status(404).send({
                         message: "Unable to parse the token",
                         success: false,
                         error: res.message
                    });
               }
               const educationId = await EducationSchema.findOne({ user_id: user._id });
               if (educationId) {
                    const educationDetails = await EducationSchema.aggregate([
                         {
                              $match: { _id: new ObjectId(educationId._id) }
                         },
                         {
                              $lookup: {
                                   from: "qualifications",
                                   localField: "_id",
                                   foreignField: "education_id",
                                   as: "qualifications"
                              }
                         }
                    ]);
                    // let data = []
                    // data = educationDetails.filter((e) => {
                    //      return e._id == id
                    // })
                    return res.status(200).send({
                         message: "Got the User",
                         success: true,
                         educationDetails,
                    });
               } else {
                    return res.status(200).send({
                         message: "Didn't find the User",
                         success: false,
                    });
               }
          } catch (error) {
               console.error('Error getting user:', error.message);
               return res.status(500).send({
                    message: "Internal server error",
                    error: error.message,
                    success: false
               });
          }
     },

     updateEducationDetails: async (req, res) => {
          try {
               const { id } = req.params
               const token = req.headers.authorization;
               if (!token) {
                    return res.status(500).send({
                         error: "Token not found",
                         success: false
                    });
               }
               const { user } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
               if (!user) {
                    return res.status(404).send({
                         message: "Unable to parse the token",
                         success: false,
                         error: res.message
                    });
               }

               const educationId = await EducationSchema.findOne({ user_id: user._id });
               if (!educationId) {
                    return res.status(404).send({
                         message: "Education details not found",
                         success: false
                    });
               }

               const {
                    // qualificationId,
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

               const updatedQualification = await QualificationSchema.findOneAndUpdate(
                    {
                         _id: id,
                    },
                    { $set: updateFields },
                    { new: true }
               );
               if (!updatedQualification) {
                    return res.status(500).send({
                         error: "Qualification Update Unsuccessful",
                         success: false,
                    });
               } else {
                    return res.status(200).send({
                         message: "Qualification Updated Successfully",
                         updatedQualification,
                         success: true,
                    });
               }
          } catch (error) {
               console.log(error);
               return res.status(500).send({
                    error: "Internal Server Error",
                    success: false,
                    technicalError: error.message
               });
          }
     },

     deleteEducationDetails: async (req, res) => {
          try {
               const { id } = req.params;
               const token = req.headers.authorization;

               if (!token) {
                    return res.status(401).json({ success: false, message: "Unauthorized: Token not found" });
               }

               const { user } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
               if (!user) {
                    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
               }

               const educationId = await EducationSchema.findOne({ user_id: user._id });
               if (!educationId) {
                    return res.status(404).json({ success: false, message: "Education details not found" });
               }

               const deletedQualification = await QualificationSchema.findByIdAndDelete(id);
               if (!deletedQualification) {
                    return res.status(404).json({ success: false, message: "Qualification not found" });
               }

               return res.status(200).json({ success: true, message: "Qualification deleted successfully" });
          } catch (error) {
               console.log(error);
               return res.status(500).send({
                    error: "Internal Server Error",
                    success: false,
                    technicalError: error.message
               });
          }
     },

     addFamilyDetails: async (req, res) => {
          const token = req.headers.authorization;
          if (!token) {
               return res.status(500).send({
                    error: "Token not found",
                    success: false
               });
          }
          const { user } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
          if (!user) {
               return res.status(404).send({
                    message: "Unable to parse the token",
                    success: false,
                    error: res.message
               });
          }
          let {
               family_name,
               family_relationship,
               family_birth_date,
               dependant
          } = req.body;
          try {
               let familyDetails = await FamilySchema.findOne({ user_id: user._id });
               if (!familyDetails) {
                    // Create a new family record if it doesn't exist
                    familyDetails = new FamilySchema({
                         user_id: user._id,
                         deleted_at: null
                    });
                    await familyDetails.save();
               }
               // Create a new qualification record associated with the education record
               const newFamilyMember = new FamilyMemberSchema({
                    family_id: familyDetails._id,
                    family_name,
                    family_relationship,
                    family_birth_date,
                    dependant,
                    deleted_at: null
               });
               await newFamilyMember.save();
               res.status(200).send({
                    message: "Member Added Successfully",
                    success: true,
                    familyDetails,
                    newFamilyMember
               });
          } catch (error) {
               console.log(error);
               return res.status(500).send({
                    error: "Internal Server Error",
                    success: false,
                    technicalError: error.message
               });
          }
     },

     getFamilyDetails: async (req, res) => {
          try {
               const token = req.headers.authorization;
               if (!token) {
                    return res.status(500).send({
                         error: "Token not found",
                         success: false
                    });
               }
               const { user } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
               if (!user) {
                    return res.status(404).send({
                         message: "Unable to parse the token",
                         success: false,
                         error: res.message
                    });
               }
               const familyId = await FamilySchema.findOne({ user_id: user._id })
               if (familyId) {
                    const familyDetails = await FamilySchema.aggregate([
                         {
                              $match: { _id: new ObjectId(familyId._id) }
                         },
                         {
                              $lookup: {
                                   from: "family-members",
                                   localField: "_id",
                                   foreignField: "family_id",
                                   as: "familyMemberDetails"
                              }
                         }
                    ]);
                    return res.status(200).send({
                         message: "Got the Family Details",
                         success: true,
                         familyDetails,
                    });
               } else {
                    return res.status(200).send({
                         message: "Didn't find the User",
                         success: false,
                    });
               }
          } catch (error) {
               console.error('Error getting user:', error.message);
               return res.status(500).send({
                    message: "Internal server error",
                    error: error.message,
                    success: false
               });
          }
     },

     updateFamilyDetails: async (req, res) => {
          try {
               const { id } = req.params;
               const token = req.headers.authorization;

               if (!token) {
                    return res.status(500).send({
                         error: "Token not found",
                         success: false
                    });
               }
               const { user } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
               if (!user) {
                    return res.status(404).send({
                         message: "Unable to parse the token",
                         success: false,
                         error: res.message
                    });
               }
               const familyId = await FamilySchema.findOne({ user_id: user._id });
               if (!familyId) {
                    return res.status(404).send({
                         message: "Family Details not found",
                         success: false,
                    });
               }
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
                         error: "Family Member Update Unsuccessful",
                         success: false,
                    });
               } else {
                    return res.status(200).send({
                         message: "Family Member Updated Successfully",
                         updatedFamilyMember,
                         success: true,
                    });
               }
          } catch (error) {
               console.log(error);
               return res.status(500).send({
                    error: "Internal Server Error",
                    success: false,
                    technicalError: error.message
               });
          }
     },

     deleteFamilyDetails: async (req, res) => {
          try {
               const { id } = req.params;
               const token = req.headers.authorization;

               if (!token) {
                    return res.status(401).json({ success: false, message: "Unauthorized: Token not found" });
               }

               const { user } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
               if (!user) {
                    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
               }
               const familyId = await FamilySchema.findOne({ user_id: user._id });
               if (!familyId) {
                    return res.status(404).json({
                         success: false,
                         message: "Family Details not found"
                    });
               }
               const deleteFamilyMemberDetails = await FamilyMemberSchema.findOneAndDelete(id)
               if (!deleteFamilyMemberDetails) {
                    return res.status(404).json({ success: false, message: "Family Member Details not found" });
               }
               return res.status(200).json({ success: true, message: "Family Member Details deleted successfully" });

          } catch (error) {
               console.log(error);
               return res.status(500).send({
                    error: "Internal Server Error",
                    success: false,
                    technicalError: error.message
               });
          }
     },

     emergencyaddFamilyDetails: async (req, res) => {
          const token = req.headers.authorization;
          if (!token) {
               return res.status(500).send({
                    error: "Token not found",
                    success: false
               });
          }
          const { user } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
          if (!user) {
               return res.status(404).send({
                    message: "Unable to parse the token",
                    success: false,
                    error: res.message
               });
          }
          let {
               family_name,
               family_relationship,
               family_birth_date,
               dependant
          } = req.body;
          try {
               let familyDetails = await FamilySchema.findOne({ user_id: user._id });
               if (!familyDetails) {
                    // Create a new family record if it doesn't exist
                    familyDetails = new FamilySchema({
                         user_id: user._id,
                         deleted_at: null
                    });
                    await familyDetails.save();
               }
               // Create a new qualification record associated with the education record
               const newFamilyMember = new EmergencyFamilyMemberSchema({
                    family_id: familyDetails._id,
                    family_name,
                    family_relationship,
                    family_birth_date,
                    dependant,
                    deleted_at: null
               });
               await newFamilyMember.save();
               res.status(200).send({
                    message: "Member Added Successfully",
                    success: true,
                    familyDetails,
                    newFamilyMember
               });
          } catch (error) {
               console.log(error);
               return res.status(500).send({
                    error: "Internal Server Error",
                    success: false,
                    technicalError: error.message
               });
          }
     },

     emergencygetFamilyDetails: async (req, res) => {
          try {
               const token = req.headers.authorization;
               if (!token) {
                    return res.status(500).send({
                         error: "Token not found",
                         success: false
                    });
               }
               const { user } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
               if (!user) {
                    return res.status(404).send({
                         message: "Unable to parse the token",
                         success: false,
                         error: res.message
                    });
               }
               const familyId = await FamilySchema.findOne({ user_id: user._id })
               if (familyId) {
                    const familyDetails = await FamilySchema.aggregate([
                         {
                              $match: { _id: new ObjectId(familyId._id) }
                         },
                         {
                              $lookup: {
                                   from: "emergency-family-members",
                                   localField: "_id",
                                   foreignField: "family_id",
                                   as: "emergencyfamilyMemberDetails"
                              }
                         }
                    ]);
                    return res.status(200).send({
                         message: "Got the Family Details",
                         success: true,
                         familyDetails,
                    });
               } else {
                    return res.status(200).send({
                         message: "Didn't find the User",
                         success: false,
                    });
               }
          } catch (error) {
               console.error('Error getting user:', error.message);
               return res.status(500).send({
                    message: "Internal server error",
                    error: error.message,
                    success: false
               });
          }
     },

     emergencyupdateFamilyDetails: async (req, res) => {
          try {
               const { id } = req.params;
               const token = req.headers.authorization;

               if (!token) {
                    return res.status(500).send({
                         error: "Token not found",
                         success: false
                    });
               }
               const { user } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
               if (!user) {
                    return res.status(404).send({
                         message: "Unable to parse the token",
                         success: false,
                         error: res.message
                    });
               }
               const familyId = await FamilySchema.findOne({ user_id: user._id });
               if (!familyId) {
                    return res.status(404).send({
                         message: "Family Details not found",
                         success: false,
                    });
               }
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
                         error: "Family Member Update Unsuccessful",
                         success: false,
                    });
               } else {
                    return res.status(200).send({
                         message: "Family Member Updated Successfully",
                         updatedFamilyMember,
                         success: true,
                    });
               }
          } catch (error) {
               console.log(error);
               return res.status(500).send({
                    error: "Internal Server Error",
                    success: false,
                    technicalError: error.message
               });
          }
     },

     emergencydeleteFamilyDetails: async (req, res) => {
          try {
               const { id } = req.params;
               const token = req.headers.authorization;

               if (!token) {
                    return res.status(401).json({ success: false, message: "Unauthorized: Token not found" });
               }

               const { user } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
               if (!user) {
                    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
               }
               const familyId = await FamilySchema.findOne({ user_id: user._id });
               if (!familyId) {
                    return res.status(404).json({
                         success: false,
                         message: "Family Details not found"
                    });
               }
               const deleteFamilyMemberDetails = await EmergencyFamilyMemberSchema.findOneAndDelete(id)
               if (!deleteFamilyMemberDetails) {
                    return res.status(404).json({ success: false, message: "Family Member Details not found" });
               }
               return res.status(200).json({ success: true, message: "Family Member Details deleted successfully" });

          } catch (error) {
               console.log(error);
               return res.status(500).send({
                    error: "Internal Server Error",
                    success: false,
                    technicalError: error.message
               });
          }
     }
};

module.exports = employeeController;
