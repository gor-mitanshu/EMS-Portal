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
               let { firstName, lastName, email, phone, password, birth_date, gender, blood_group, marital_status } = req.body;
               let { companyName, register_office, companySize, employeeStrength, inTime, out_time, garce_time, working_hours, user_id } = req.body;

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
                    let image = '';
                    if (req.file) {
                         image = req.file.filename;
                    }

                    // Validations
                    if (!firstName) {
                         return res.status(400).json({ message: "Firstname is required", success: false });
                    }
                    if (!lastName) {
                         return res.status(400).json({ message: "Lastname is required", success: false });
                    }
                    if (!email) {
                         return res.status(400).json({ message: "Email is required", success: false });
                    }
                    if (!phone) {
                         return res.status(400).json({ message: "Phone is required", success: false });
                    }
                    if (!password) {
                         return res.status(400).json({ message: "Password is required", success: false });
                    }

                    // Create a new user in the CommonSchema
                    const newUserCommonSchema = new CommonSchema({
                         firstName, lastName, email, phone, password: hashedPassword, birth_date, gender, blood_group, marital_status, image, role: "company"
                    });
                    await newUserCommonSchema.save();

                    res.status(201).send({
                         userData: newUserCommonSchema,
                         success: true,
                    });
               }

               // Create a new user in the CompanySchema model
               if (!!companyName && companyName !== undefined) {
                    // Validations
                    if (!user_id) {
                         return res.status(400).json({ message: "User Id is missing", success: false });
                    }
                    if (!companyName) {
                         return res.status(400).json({ message: "Company name is required", success: false });
                    }
                    if (!companySize) {
                         return res.status(400).json({ message: "Company Size is required", success: false });
                    }
                    if (!employeeStrength) {
                         return res.status(400).json({ message: "Employee Strength is required", success: false });
                    }


                    const newUserCompanyUser = new CompanySchema({
                         user_id, company_name: companyName, register_office, company_size: companySize, employee_no: employeeStrength, set_time_shift: { inTime, out_time, garce_time, working_hours }
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
