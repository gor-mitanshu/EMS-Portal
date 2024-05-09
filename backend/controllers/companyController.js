// configuring dotenv
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { ObjectId } = require('mongoose').Types;
const fs = require('fs');
const path = require('path');


// Importing models
const UserSchema = require('../models/userSchema/userSchema').UserModel;
const CompanySchema = require('../models/companySchema/companySchema');
const DepartmentSchema = require('../models/companySchema/departmentSchema');
const SubDepartment = require('../models/companySchema/subdepartmentSchema');
const Policy = require('../models/companySchema/policySchema');
const Announcement = require('../models/companySchema/announcementSchema');

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
  // OverView
  addCompanyDetails: async (req, res) => {
    // console.log(req.user)
    let { register_company, brand_name, company_official_email, company_official_contact, website, domain_name, industry_type, linked_in, facebook, twitter, user_id } = req.body
    try {
      const overViewDetails = new CompanySchema({
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

  getCompanyDetails: async (req, res) => {
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
      const company = await CompanySchema.findOne({ user_id: id })
      // if (!company) {
      //   return res.status(404).send({
      //     message: "Details not found",
      //     success: false
      //   });
      // }
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

  updateCompanyDetails: async (req, res) => {
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
      const updateOverview = await CompanySchema.findOneAndUpdate(
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
      const addressDetails = new CompanySchema({
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
      const company = await CompanySchema.findOne({ user_id: id })
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
      const updateCompanyAddress = await CompanySchema.findOneAndUpdate(
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
      // Create a new Announcement record if it doesn't exist
      const announcement = new Announcement({
        company_id: companyDetails._id,
        announcement: req.body.announcement,

        deleted_at: null
      })
      await announcement.save();

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

  getAnnouncement: async (req, res) => {
    const companyDetails = req.companyDetails;
    try {
      const announcement = await Announcement.find({ company_id: companyDetails._id });
      if (announcement) {
        return res.status(200).send({
          announcement,
        });
      } else {
        return res.status(200).send({
          message: "Didn't find the details",
        });
      }
    } catch (error) {
      return res.status(500).send({
        message: "Internal server error",
        error: error.message,
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
    try {
      const policy = await Policy.findOne({ company_id: req.companyDetails._id })
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
      const getCompanydetails = req.companyDetails;
      const policy = await Policy.findOne({ company_id: getCompanydetails._id })
      if (!policy) {
        return res.status(404).send({
          message: "Policy not found",
          success: false,
        });
      }
      console.log(req.body);
      const { policy_title, policy_description } = req.body;
      let policy_file = '';
      // Check if a new file was uploaded
      if (req.files && req.files.length > 0) {
        policy_file = req.files[0].filename;
        // Delete the old file
        const existingPolicy = await PolicyData.findById({ id: policy_file._id });
        if (existingPolicy && existingPolicy.policy_file) {
          const filePath = path.join('images', existingPolicy.policy_file);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      } else {
        // No new file uploaded, keep the existing file
        const existingPolicy = await PolicyData.findById({ id: policy_file._id });
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
        { _id: policy._id },
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
    const { id } = req.params;
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
