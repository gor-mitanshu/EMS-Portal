// configuring dotenv
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

// Importing models
const CommonSchema = require('../models/commonSchema/userSchema').UserModel;
const CompanySchema = require('../models/companySchema/companySchema');

// jwt secret
const jwtSecret = process.env.JWT_SECRET;
// generate OTP
function generateOTP () {
  let digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_URL,
    pass: process.env.EMAIL_PASSWORD,
  }
});

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
          return res.status(403).send({
            message: "Already Registered",
            success: false,
            data: null
          });
        }

        const expireIn = "1h";
        const verificationToken = jwt.sign({ email }, jwtSecret, { expiresIn: expireIn });
        const hashedPassword = await bcrypt.hash(password, 10);
        // Validations
        if (!firstName || !lastName || !email || !phone || !password) {
          return res.status(409).send({
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
          firstName, lastName, email, phone, password: hashedPassword, role: "company", verification_token: verificationToken
        });
        await newUserCommonSchema.save();

        const verificationLink = `${process.env.REACT_URL}/verify/${verificationToken}`

        const mailOptions = {
          from: process.env.EMAIL_URL,
          to: email,
          subject: 'Registration in Process...',
          html: `
        <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      type="text/css"
    />
    <script
      src="https://kit.fontawesome.com/363da174db.js"
      crossorigin="anonymous"
    ></script>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
      }
      .karm_digitech-a {
        font-size: 40px !important;
      }
      .container a {
        text-decoration: none;
        font-size: 25px;
      }
      .karm_digitech {
        color: rgb(197, 68, 68);
        margin: 5px 0;
        text-align: center;
        cursor: pointer;
      }
      .icon {
        color: rgba(255, 0, 0, 0.7);
        border-radius: 50%;
        padding: 10px;
        background-color: white;
        width: 10%;
      }
      .logo {
        display: flex;
        justify-content: center;
        background-color: rgba(255, 0, 0, 0.6);
        margin: 10px 10px 10px 10px;
        border-radius: 4px;
        color: red !important;
      }

      .success {
        color: rgba(0, 128, 0.7);
      }
      .content {
        padding: 20px;
        border-radius: 5px;
      }

      .text-center {
        text-align: center;
      }
      .center {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .margin-btn {
        margin: 40px 0 !important;
      }

      .btn {
        text-decoration: none !important;
        color: #fff !important;
        background-color: rgba(255, 0, 0, 0.6);
        display: inline-block !important;
        padding: 8px 20px !important;
        border-radius: 5px !important;
      }
      .error {
        color: red;
      }
      .margin-bottom {
        margin-bottom: 40px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <a href="#" target="_blank" class="karm_digitech-a">
        <div class="karm_digitech">Karm Digitech</div>
      </a>
      <div class="logo" style="text-align: center">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td align="center">
              <img
                style="display: block"
                src="https://images.emlcdn.net/cdn/14/QHcab14c9/email.png"
                alt="Facebook"
                height="48"
                width="48"
              />
            </td>
          </tr>
        </table>
      </div>
      <div class="content">
        <h1 class="text-center">Email Verification</h1>
        <p>
          <b class="success">
            Hii ${newUserCommonSchema.firstName + " " +
            newUserCommonSchema.lastName} ,
          </b>
        </p>
        <p>
          Thank you for signing up! You are almost set. Please click the link
          below to verify your email address and get started. The link expires
          in about 1 Hour.
        </p>
        <div class="margin-btn" style="text-align: center">
          <a href="${verificationLink}" class="btn" target="_blank" class="btn"
            >Verify Email</a
          >
        </div>
        <div class="error margin-bottom">
          <hr />
        </div>
        <div class="social-icons" style="text-align: center">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="display: inline-table"
          >
            <tr>
              <td style="width: 10px"></td>
              <td>
                <a
                  href="#"
                  target="_blank"
                >
                  <img
                    style="display: block"
                    src="https://images.emlcdn.net/cdn/14/QHcab14c9/facebook4.png"
                    alt="Facebook"
                    height="32"
                    width="32"
                  />
                </a>
              </td>
              <td style="width: 10px"></td>
              <td>
                <a href="#" target="_blank">
                  <img
                    style="display: block"
                    src="https://images.emlcdn.net/cdn/14/QHcab14c9/insta.png"
                    alt="Facebook"
                    height="32"
                    width="32"
                  />
                </a>
              </td>
              <td style="width: 10px"></td>
              <td>
                <a href="#" target="_blank">
                  <img
                    style="display: block"
                    src="https://images.emlcdn.net/cdn/14/QHcab14c9/linkedin.png"
                    alt="Facebook"
                    height="32"
                    width="32"
                  />
                </a>
              </td>
              <td style="width: 10px"></td>
              <td>
                <a href="#" target="_blank">
                  <img
                    style="display: block"
                    src="https://images.emlcdn.net/cdn/14/QHcab14c9/twitter.png"
                    alt="Facebook"
                    height="32"
                    width="32"
                  />
                </a>
              </td>
              <td style="width: 10px"></td>
            </tr>
          </table>
        </div>
        <div style="text-align: center; margin-top: 15px; font-size: 12px">
          E/922 Ganesh Glory-11, Jagatpur road,
        </div>
        <div style="text-align: center; margin-top: 5px; font-size: 12px">
          Gota, Ahmedabad
        </div>
        <div
          style="
            text-align: center;
            margin-top: 25px;
            margin-bottom: 50px !important;
            font-size: 15px;
            color: grey;
          "
        >
          | Privacy Policy | Contact Details |
        </div>
        <div
          style="
            font-size: 9px;
            text-decoration: underline;
            cursor: pointer;
            color: grey;
          "
        >
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="left">Unsubscribe?</td>
              <td align="right">by © Mitanshu Gor</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </body>
</html>

               `,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            return res.status(250).send({
              success: true,
              message: 'Email sent successfully',
              technicalMessage: 'Email sent: ' + info.response
            });
          }
        });

        res.status(200).send({
          userData: newUserCommonSchema,
          success: true,
        });
      }

      // Create a new user in the CompanySchema model
      if (companyName !== undefined) {
        // Validations
        if (!user_id || !companyName || !companySize || !employeeStrength) {
          return res.status(409).send({
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

        res.status(200).send({
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

  resendVerificationLink: async (req, res) => {
    const { email } = req.body;
    try {
      // Check if user exists
      const user = await CommonSchema.findOne({ email });
      if (!user) {
        return res.status(404).send({
          message: "User not found",
          success: false,
        });
      }

      // Generate new verification token
      const expireIn = "1h";
      const verificationToken = jwt.sign({ email }, jwtSecret, { expiresIn: expireIn });

      // Update user's verification token
      user.verification_token = verificationToken;
      await user.save();

      // Send verification link
      const verificationLink = `${process.env.REACT_URL}/verify/${verificationToken}`;
      const mailOptions = {
        from: process.env.EMAIL_URL,
        to: email,
        subject: 'Email Verification Link',
        html: `
          <p>Please click the following link to verify your email:</p>
          <a href="${verificationLink}">Click Me!!🧑🏻</a>
        `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).send({
            message: "Error sending verification email",
            success: false,
            error: error.message,
          });
        }
        return res.status(200).send({
          message: "Verification link sent successfully",
          success: true,
          data: verificationLink
        });
      });
    } catch (error) {
      console.error('Error resending verification link:', error);
      return res.status(500).send({
        message: "Internal Server Error",
        success: false,
        error: error.message,
      });
    }
  },

  verifyEmail: async (req, res) => {
    const verificationToken = req.params.verificationToken;

    try {
      const user = await CommonSchema.findOne({ verification_token: verificationToken });

      if (!user) {
        return res.status(404).send({ message: 'Invalid verification token', success: false });
      }

      if (user.is_email_verified) {
        return res.status(200).send({ message: 'Email already verified', success: true });
      }

      try {
        jwt.verify(verificationToken, process.env.JWT_SECRET);
        user.is_email_verified = true;
        user.verification_token = undefined;
        await user.save();

        return res.status(200).send({ message: 'Email verification successful', success: true });
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
          return res.status(401).send({
            message: 'Token has expired',
            success: false,
          });
        } else {
          return res.status(500).send({
            message: 'Error verifying the token',
            success: false,
          });
        }
      }
    } catch (error) {
      return res.status(500).send({ message: 'Internal server error', success: false });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await CommonSchema.findOne({ email: email });

      // Validations
      if (!email || !password) {
        return res.status(400).send({
          message: "All Fields are required",
          success: false,
          errors: {
            email: !email ? "Firstname is required" : "",
            password: !password ? "Password is required" : "",
          }
        });
      }

      if (!user) {
        return res.status(404).send({ message: "User not found. Please Register Yourself!", success: false });
      }

      const compareHashedPassword = await bcrypt.compare(password, user.password);
      if (!compareHashedPassword) {
        return res.status(401).send({ errors: { password: "Password does not match" }, success: false });
      }

      if (user.is_email_verified) {
        const expireIn = "10h";
        const token = jwt.sign({ user }, jwtSecret, { expiresIn: expireIn });

        return res.status(200).send({
          message: "Logged In Successfully!!!",
          success: true,
          token: token,
          isVerified: user.is_email_verified
        });
      } else {
        return res.status(401).send({
          status: 300,
          errors: "Email not verified. Please verify your email to log in.",
          success: false,
        });
      }
    } catch (error) {
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
        success: false
      });
    }
  },

  forgetPassword: async (req, res) => {
    try {
      const email = req.body.email;

      if (!email) {
        return res.status(404).send({ message: 'Please enter your Email' });

      }
      const user = await CommonSchema.findOne({ email: email });

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      const otp = generateOTP();
      const otpExpiry = new Date();
      otpExpiry.setMinutes(otpExpiry.getMinutes() + 15);

      user.forget_password_otp = otp;
      user.forget_password_otp_expiry = otpExpiry;
      await user.save();

      var mailOptions = {
        from: process.env.EMAIL_URL,
        to: email,
        subject: 'Forgot Password OTP',
        text: `Your OTP is: ${otp} `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error.message);
          res.status(500).json({ message: 'Failed to send OTP' });

        } else {
          // console.log('Email sent: ' + info.response);
          return res.status(200).send({
            message: 'OTP sent successfully. Please Check your Mail',
            data: 'Email sent: ' + info.response,
            status: "Success",
            success: true
          });
        }
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: "Something went wrong",
        error: error.messsage
      });
    }
  },

  verifyForgetPasswordOTP: async (req, res) => {
    const { email, otp } = req.body;

    if (!otp) {
      return res.status(404).send({ message: 'Please Enter OTP' });
    }
    const user = await CommonSchema.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    if (user.forget_password_otp !== otp || user.forget_password_otp_expiry < new Date()) {
      return res.status(400).send({ message: 'Invalid or expired OTP' });
    }

    user.forget_password_otp = undefined;
    user.forget_password_otp_expiry = undefined;
    await user.save();

    const expireIn = "1d";
    const token = jwt.sign({ user },
      jwtSecret,
      { expiresIn: expireIn });

    var mailOptions = {
      from: process.env.EMAIL_URL,
      to: email,
      subject: 'OTP Verified Successfully.',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error.message);
        res.status(500).json({ message: 'OTP Not Verified' });

      } else {
        return res.status(200).send({
          message: 'OTP Verified Successfully',
          data: { token, id: user._id },
          status: "Success",
          success: true,
        });
      }
    });
  },

  resetPassword: async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
      const tokens = jwt.verify(token, 'token');
      if (tokens) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatePassword = await CommonSchema.findByIdAndUpdate({ _id: id },
          { $set: { password: hashedPassword } },
          { new: true })
        if (updatePassword) {
          return res.status(200).send({ message: "Password Reset Successfully", success: true, data: updatePassword })
        } else {
          return res.status(404).send({
            message: "Password not updated",
            success: false
          })
        }
      }
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: "Something went wrong",
        error: error.messsage
      });
    }
  },

};

module.exports = companyController;
