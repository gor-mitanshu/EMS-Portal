// configuring dotenv
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { ObjectId } = require('mongoose').Types;


// Importing models
const CommonSchema = require('../models/commonSchema/userSchema').UserModel;
const CompanySchema = require('../models/companySchema/companySchema');
const Department = require('../models/companySchema/department/departmentSchema');
const SubDepartment = require('../models/companySchema/department/subDepartment');
const Overview = require('../models/companySchema/overview/overviewSchema');
const Address = require('../models/companySchema/address/address');
const Policy = require('../models/companySchema/policy/policy');
const PolicyData = require('../models/companySchema/policy/policy_data');
const Announcement = require('../models/companySchema/announcement/announcement');
const AnnouncementData = require('../models/companySchema/announcement/announcement_data');

// jwt secret
const jwtSecret = process.env.JWT_SECRET;

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

  // OverView
  addOverview: async (req, res) => {
    // console.log(req.user)
    let { register_company, brand_name, company_official_email, company_official_contact, website, domain_name, industry_type, linked_in, facebook, twitter, user_id } = req.body
    try {
      const overViewDetails = new Overview({
        register_company, brand_name, company_official_email, company_official_contact, website, domain_name, industry_type,
        linked_in: linked_in,
        facebook: facebook,
        twitter: twitter,
        user_id
      });
      await overViewDetails.save();

      res.status(200).send({
        message: "Added Successfully",
        success: true,
        overViewDetails
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

  getOverview: async (req, res) => {
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
      const company = await Overview.findOne({ user_id: id })
      if (!company) {
        return res.status(404).send({
          message: "Details not found",
          success: false
        });
      }
      return res.status(200).send({
        message: "Successfully Got the Details",
        success: true,
        company
      });
    } catch (error) {
      res.status(400).send({
        message: "Internal server error",
        error: error.message,
        success: false
      });
    }
  },

  updateOverview: async (req, res) => {
    const { id } = req.params;
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
      let { register_company, brand_name, company_official_email, company_official_contact, website, domain_name, industry_type, linked_in, facebook, twitter } = req.body
      const updatedFields = {
        register_company,
        brand_name,
        company_official_email,
        company_official_contact,
        website,
        domain_name,
        industry_type,
        linked_in,
        facebook,
        twitter,
      }
      const updateOverview = await Overview.findOneAndUpdate(
        { user_id: id },
        { $set: updatedFields },
        { new: true }
      );
      if (!updateOverview) {
        return res.status(500).send({
          error: "Update Unsuccessful",
          success: false,
        });
      } else {
        return res.status(200).send({
          message: "Update Successful",
          updateOverview,
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

  // Address
  addCompanyAddress: async (req, res) => {
    // console.log(req.user)
    const { user } = req.user;
    let { register_office_address, corporate_office_address, custom_office_address } = req.body
    const getCompanydetails = await CompanySchema.findOne({ user_id: user._id })
    try {
      const addressDetails = new Address({
        register_office_address, corporate_office_address, custom_office_address, user_id: user._id, company_id: getCompanydetails._id
      });
      await addressDetails.save();

      res.status(200).send({
        message: "Added Successfully",
        success: true,
        addressDetails
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

  getCompanyAddress: async (req, res) => {
    const { id } = req.params;
    try {
      const company = await Address.findOne({ user_id: id })
      if (!company) {
        return res.status(404).send({
          message: "Details not found",
          success: false
        });
      }
      return res.status(200).send({
        message: "Successfully Got the Details",
        success: true,
        company
      });
    } catch (error) {
      res.status(400).send({
        message: "Internal server error",
        error: error.message,
        success: false
      });
    }
  },

  updateCompanyAddress: async (req, res) => {
    const { id } = req.params;
    let { register_office_address, corporate_office_address, custom_office_address } = req.body
    try {
      const updatedFields = {
        register_office_address, corporate_office_address, custom_office_address
      }
      const updateCompanyAddress = await Address.findOneAndUpdate(
        { user_id: id },
        { $set: updatedFields },
        { new: true }
      ); if (!updateCompanyAddress) {
        return res.status(500).send({
          error: "Update Unsuccessful",
          success: false,
        });
      } else {
        return res.status(200).send({
          message: "Update Successful",
          updateCompanyAddress,
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

  // Department
  addDepartment: async (req, res) => {
    try {
      // Create a new department object
      const departments = req.body.map(department => ({
        company_id: department.company_id,
        department: department.department
      }));
      const savedDepartment = await Department.insertMany(departments);

      // Create a new subdepartment object
      if (savedDepartment.length > 0) {
        let subDep = []
        savedDepartment.forEach(savedDep => {
          req.body.forEach(departments => {
            departments.sub_departments.forEach(subDepartments => {
              subDep.push({
                department_id: savedDep._id,
                sub_departments: subDepartments
              })
            })
          });
        })
        if (subDep.length > 0) {
          var result = subDep.reduce((unique, o) => {
            if (!unique.some(obj => obj.sub_departments === o.sub_departments)) {
              unique.push(o);
            }
            return unique;
          }, []);
          await SubDepartment.insertMany(result)
        }
      }
      // Send a success response
      res.status(201).json(savedDepartment);
    } catch (err) {
      // Handle errors
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Designation 

  // Announcements
  addAnnouncement: async (req, res) => {
    const companyDetails = req.companyDetails;
    try {
      let announcement = await Announcement.findOne({ company_id: companyDetails._id })
      if (!announcement) {
        // Create a new Announcement record if it doesn't exist
        announcement = new Announcement({
          company_id: companyDetails._id,
          deleted_at: null
        })
        await announcement.save();
      }

      const announcementData = new AnnouncementData({
        announcement_id: announcement._id,
        announcement: req.body.announcement
      });
      await announcementData.save();

      res.status(200).send({
        message: "Added Successfully",
        success: true,
        announcement,
        announcementData
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

  getAnnouncement: async (req, res) => {
    const companyDetails = req.companyDetails;
    try {
      const announcement = await Announcement.findOne({ company_id: companyDetails._id });
      if (announcement) {
        const announcementDetails = await Announcement.aggregate([
          {
            $match: { _id: new ObjectId(announcement._id) }
          },
          {
            $lookup: {
              from: "announcement-datas",
              localField: "_id",
              foreignField: "announcement_id",
              as: "announcement_details"
            }
          }
        ]);
        return res.status(200).send({
          message: "Got the details",
          success: true,
          announcementDetails,
        });
      } else {
        return res.status(200).send({
          message: "Didn't find the details",
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

  updateAnnouncement: async (req, res) => {
    const { id } = req.params;
    // const companyDetails = req.companyDetails;
    try {
      // const announcement = await Announcement.findOne({ company_id: companyDetails._id })
      // if (!announcement) {
      //   return res.status(404).send({
      //     message: "Couldn't find announcement",
      //     success: false
      //   })
      // }
      const updateAnnouncement = await AnnouncementData.findOneAndDelete(
        { _id: id },
        { $set: { announcement: req.body.announcement } },
        { news: true }
      );
      if (!updateAnnouncement) {
        return res.status(500).send({
          error: "Announcement Update Unsuccessful",
          success: false,
        });
      } else {
        return res.status(200).send({
          message: "Qualification Updated Successfully",
          updateAnnouncement,
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

  deleteAnnouncement: async (req, res) => {
    const { id } = req.params;
    // const companyDetail = req.companyDetail;
    try {
      // const announcement = await Announcement.findOne({ company_id: companyDetail._id })
      // if (!announcement) {
      //   return res.status(404).send({
      //     message: "Couldn't find announcement",
      //     success: false
      //   })
      // }
      const deleteAnnouncement = await AnnouncementData.findOneAndDelete(id);
      if (!deleteAnnouncement) {
        return res.status(404).json({ success: false, message: "Announcement not found" });
      }
      return res.status(200).json({ success: true, message: "Announcement deleted successfully" });

    } catch (error) {
      console.log(error);
      return res.status(500).send({
        error: "Internal Server Error",
        success: false,
        technicalError: error.message
      });
    }
  },

  // Policies
  addPolicy: async (req, res) => {
    const { user } = req.user;
    let { policy_title, policy_description } = req.body;
    try {
      let file = '';
      if (req.files && req.files.length > 0) {
        file = req.files[0].filename;
      }
      const getCompanydetails = await CompanySchema.findOne({ user_id: user._id })

      let policyDetails = await Policy.findOne({ company_id: getCompanydetails._id });
      if (!policyDetails) {
        // Create a new Poilcy record if it doesn't exist
        policyDetails = new Policy({
          company_id: getCompanydetails._id,
          deleted_at: null
        });
        await policyDetails.save();
      }

      // Create a new policy data record associated with the policy record
      const newPolicyData = new PolicyData({
        policy_id: policyDetails._id,
        policy_title,
        policy_description,
        policy_file: file,
        deleted_at: null,
      });
      await newPolicyData.save();
      res.status(200).send({
        message: "Policy Added Successfully",
        success: true,
        policyDetails,
        newPolicyData
      })
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        error: "Internal Server Error",
        success: false,
        technicalError: error.message
      });
    }
  },

  getPolicy: async (req, res) => {
    const getCompanydetails = req.companyDetails;
    try {
      const policy = await Policy.findOne({ company_id: getCompanydetails._id })
      if (policy) {
        const policyData = await Policy.aggregate([
          {
            $match: { _id: new ObjectId(policy._id) }
          },
          {
            $lookup: {
              from: "policy-datas",
              localField: "_id",
              foreignField: "policy_id",
              as: "policy_details"
            }
          }
        ])
        return res.status(200).send({
          message: "Got the Policy Data",
          success: true,
          policyData,
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

  updatePolicy: async (req, res) => {
    try {
      const { user } = req.user;
      if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
      }
      const getCompanydetails = await CompanySchema.findOne({ user_id: user._id })
      const policy = await Policy.findOne({ company_id: getCompanydetails._id })
      if (!policy) {
        return res.status(404).send({
          message: "Policy not found",
          success: false,
        });
      }
      const { policy_title, policy_description } = req.body;
      let policy_file = '';
      // Check if a new file was uploaded
      if (req.files && req.files.length > 0) {
        policy_file = req.files[0].filename;
        // Delete the old file
        const existingPolicy = await PolicyData.findById(id);
        if (existingPolicy && existingPolicy.policy_file) {
          const filePath = path.join('images', existingPolicy.policy_file);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      } else {
        // No new file uploaded, keep the existing file
        const existingPolicy = await PolicyData.findById(id);
        if (existingPolicy) {
          policy_file = existingPolicy.policy_file;
        }
      }
      const updatedFields = {
        policy_title,
        policy_description,
        policy_file,
      }
      const updatedDocument = await PolicyData.findOneAndUpdate(
        { _id: id },
        { $set: updatedFields },
        { new: true }
      )
      if (!updatedDocument) {
        return res.status(500).send({
          error: "Policy Update Unsuccessful",
          success: false,
        });
      } else {
        return res.status(200).send({
          message: "Policy Updated Successfully",
          updatedDocument,
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

  deletePolicy: async (req, res) => {
    const { user } = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
    try {
      const getCompanydetails = await CompanySchema.findOne({ user_id: user._id })
      const policy = await Policy.findOne({ company_id: getCompanydetails._id })
      if (!policy) {
        return res.status(404).send({
          message: "Policy not found",
          success: false,
        });
      }
      const deletePolicy = await PolicyData.findOneAndDelete(id);
      if (!deletePolicy) {
        return res.status(404).json({ success: false, message: "Document not found" });
      }
      //  Delete the associated file
      const filePath = path.join(__dirname, 'images', deletePolicy.policy_file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return res.status(200).json({ success: true, message: "Policy deleted successfully" });
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

module.exports = companyController;
