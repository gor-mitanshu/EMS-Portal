// configuring dotenv
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Importing models
const CommonSchema = require('../models/commonSchema/userSchema').UserModel;

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

const commonController = {
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

     getPersonalDetailsOfUserFromToken: async (req, res) => {
          try {
               const token = req.headers.authorization;
               if (!token) {
                    return res.status(500).send({
                         error: "Token not found",
                         success: false
                    });
               }
               const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
               if (!data) {
                    return res.status(404).send({
                         message: "Unalbe to parse the token",
                         success: false,
                         error: res.message
                    });
               }
               const user = await CommonSchema.findOne({ _id: data.user._id })
               if (!user) {
                    return res.status(404).send({
                         message: "User not found",
                         success: false
                    });
               }
               return res.status(200).send({
                    message: "Successfully Got the User",
                    success: true,
                    user
               });
          } catch (error) {
               res.status(400).send({
                    message: "Internal server error",
                    error: error.message,
                    success: false
               });
          }
     },
}

module.exports = commonController;
