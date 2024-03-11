// configuring dotenv
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
// Importing models
const CommonSchema = require('../models/commonSchema/userSchema').UserModel;
const EmployeeSchema = require('../models/employeeSchema/employeeSchema');

// List of the controllers
const companyController = {
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

     login: async (req, res) => {
          try {
               const { email, password } = req.body;
               const user = await CommonSchema.findOne({ email: email });
               if (!user) {
                    return res.status(404).send({ message: "User not found. Please Register Yourself!", success: false });
               }
               const compareHashedPassword = await bcrypt.compare(password, user.password);

               if (!compareHashedPassword) {
                    return res.status(401).send({ message: "Password does not match", success: false });
               }

               const expireIn = "10h";
               const token = jwt.sign({ user }, jwtSecret, { expiresIn: expireIn });

               return res.status(200).send({
                    message: "Logged In Successfully!!!",
                    success: true,
                    data: token
               });
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message,
                    success: false
               });
          }
     },
};

module.exports = companyController;
