// configuring dotenv
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Importing models
const CommonSchema = require('../models/commonSchema/userSchema').UserModel;
const CompanySchema = require('../models/companySchema/companySchema');

// jwt secret
const jwtSecret = process.env.JWT_SECRET;

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
          user: 'your-email@gmail.com',
          pass: 'your-email-password'
     }
});

// OTP Generation thing
function generateOTP () {
     let digits = '0123456789';
     let OTP = '';
     for (let i = 0; i < 4; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
     }
     return OTP;
}

// List of the controllers
const companyController = {
     signup: async (req, res) => {
          try {
               // getting the body part from request
               let { firstName, lastName, email, phone, password } = req.body;
               let { companyName, companySize, employeeStrength, user_id } = req.body;

               // creating the new user in the CommonSchema model
               if (password !== undefined) {
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
                    // Validations
                    if (!firstName || !lastName || !email || !phone || !password) {
                         return res.status(400).send({
                              message: "All Fields are required",
                              success: false,
                              errors: {
                                   firstName: !firstName ? "Firstname is required" : "",
                                   lastName: !lastName ? "Lastname is required" : "",
                                   email: !email ? "Email is required" : "",
                                   phone: !phone ? "Phone is required" : "",
                                   password: !password ? "Password is required" : "",
                              }
                         });
                    }

                    // Regex pattern for first name and last name: should be 2 to 30 characters long and can contain letters and spaces
                    const nameRegex = /^[a-zA-Z ]{2,30}$/;
                    if (!firstName.match(nameRegex)) {
                         return res.status(400).send({
                              message: "Invalid First Name",
                              success: false,
                              errors: {
                                   firstName: "Please enter a valid First Name (2-30 characters, letters only)"
                              }
                         });
                    }

                    if (!lastName.match(nameRegex)) {
                         return res.status(400).send({
                              message: "Invalid Last Name",
                              success: false,
                              errors: {
                                   lastName: "Please enter a valid Last Name (2-30 characters, letters only)"
                              }
                         });
                    }

                    // Regex pattern for email: should match the typical email format
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!email.match(emailRegex)) {
                         return res.status(400).send({
                              message: "Invalid Email",
                              success: false,
                              errors: {
                                   email: "Please enter a valid Email Address"
                              }
                         });
                    }

                    // Regex pattern for phone number: should be exactly 10 digits long
                    const phoneRegex = /^[0-9]{10}$/;
                    if (!phone.match(phoneRegex)) {
                         return res.status(400).send({
                              message: "Invalid Phone Number",
                              success: false,
                              errors: {
                                   phone: "Please enter a valid 10-digit Phone Number"
                              }
                         });
                    }

                    // Regex pattern for password: should be 5 to 10 characters long and can contain letters, digits, and some special characters
                    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+]{5,10}$/;
                    if (!password.match(passwordRegex)) {
                         return res.status(400).send({
                              message: "Invalid Password",
                              success: false,
                              errors: {
                                   password: "Please enter a valid Password (5-10 characters, may include special characters)"
                              }
                         });
                    }

                    // Create a new user in the CommonSchema
                    const newUserCommonSchema = new CommonSchema({
                         firstName, lastName, email, phone, password: hashedPassword, role: "company"
                    });
                    await newUserCommonSchema.save();

                    res.status(201).send({
                         userData: newUserCommonSchema,
                         success: true,
                    });
               }

               // Create a new user in the CompanySchema model
               if (companyName !== undefined) {
                    // Validations
                    if (!user_id || !companyName || !companySize || !employeeStrength) {
                         return res.status(400).send({
                              message: "All Fields are required",
                              success: false,
                              errors: {
                                   user_id: !user_id ? "user_id is requierd" : "",
                                   companyName: !companyName ? "Company name is required" : "",
                                   companySize: !companySize ? "Company Size is required" : "",
                                   employeeStrength: !employeeStrength ? "Employee Strength is required" : "",
                              }
                         });
                    }

                    const newUserCompanyUser = new CompanySchema({
                         user_id, company_name: companyName, company_size: companySize, employee_no: employeeStrength,
                    });
                    await newUserCompanyUser.save();

                    res.status(201).send({
                         message: "Registered Successfully",
                         success: true,
                         // data: { newUserCommonSchema }
                    });
               }

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
