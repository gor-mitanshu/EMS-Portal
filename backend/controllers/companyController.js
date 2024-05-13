require('dotenv').config();
const fs = require('fs');
const path = require('path');

const CompanySchema = require('../models/companySchema/companySchema');
const DepartmentSchema = require('../models/companySchema/departmentSchema');
const SubDepartmentSchema = require('../models/companySchema/subdepartmentSchema');
const PolicySchema = require('../models/companySchema/policySchema');
const AnnouncementSchema = require('../models/companySchema/announcementSchema');

const companyController = {
  addCompanyDetails: async (req, res) => {
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
      if (overViewDetails) {
        res.status(200).send({
          message: "Added Successfully",
        });
      } else {
        res.status(400).send({
          message: "Added Unsuccessfully",
        });
      }
    } catch (error) {
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message
      });
    }
  },

  getCompanyDetailsByUserId: async (req, res) => {
    try {
      const { id } = req.params;
      const company = await CompanySchema.findOne({ user_id: id })
      if (!!company) {
        return res.status(200).send({
          company
        });
      } else {
        return res.status(501).send({
          message: "Couldn't find company details"
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getCompanyDetailsById: async (req, res) => {
    try {
      const { id } = req.params;
      const company = await CompanySchema.findOne({ _id: id })
      if (company) {
        return res.status(200).send({
          company
        });
      } else {
        return res.status(501).send({
          message: "Company Details not found",
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateCompanyDetails: async (req, res) => {
    const { id } = req.params;
    try {

      let { company_name, brand_name, company_official_email, company_official_contact, website, domain_name, industry_type, company_address, linked_in, facebook, twitter } = req.body
      const updatedFields = {
        company_name,
        brand_name,
        company_official_email,
        company_official_contact,
        website,
        domain_name,
        industry_type,
        company_address,
        linked_in,
        facebook,
        twitter,
      }
      const updateOverview = await CompanySchema.findOneAndUpdate(
        { _id: id },
        { $set: updatedFields },
        { new: true }
      );
      if (!updateOverview) {
        return res.status(500).send({
          message: "Update Unsuccessful",
        });
      } else {
        return res.status(200).send({
          message: "Update Successful"
        });
      }
    } catch (error) {
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message
      });
    }
  },

  // Department
  addDepartment: async (req, res) => {
    try {
      const departments = req.body.map(department => ({
        company_id: department.company_id,
        department: department.department
      }));
      const savedDepartment = await DepartmentSchema.insertMany(departments);

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
          await SubDepartmentSchema.insertMany(result)
        }
      }
      res.status(201).json(savedDepartment);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Designation 

  // Announcements
  addAnnouncement: async (req, res) => {
    const { id } = req.params;
    try {
      const announcement = new AnnouncementSchema({
        company_id: id,
        announcement: req.body.announcement,
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
    const { id } = req.params;
    try {
      const announcement = await AnnouncementSchema.find({ company_id: id });
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
    const { announcement } = req.body;
    try {
      const updateAnnouncement = await AnnouncementSchema.findOneAndUpdate(
        { _id: id },
        { $set: announcement },
        { news: true }
      );

      if (!updateAnnouncement) {
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

  deleteAnnouncement: async (req, res) => {
    const { id } = req.params;
    try {
      const deleteAnnouncement = await AnnouncementSchema.findOneAndDelete({ _id: id });
      if (!deleteAnnouncement) {
        return res.status(404).json({ message: "Announcement not found" });
      }
      return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message
      });
    }
  },

  // Policies
  addPolicy: async (req, res) => {
    const { id } = req.params;
    let { policy_title, policy_description } = req.body;
    try {
      let file = '';
      if (req.files && req.files.length > 0) {
        file = req.files[0].filename;
      }
      const policyData = new PolicySchema({
        company_id: id,
        policy_title,
        policy_description,
        policy_file: file,
      });
      await policyData.save();
      res.status(200).send({
        message: "Added Successfully",
      })
    } catch (error) {
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message
      });
    }
  },

  getPolicy: async (req, res) => {
    const { id } = req.params;
    try {
      const policy = await PolicySchema.find({ company_id: id })
      if (policy) {
        return res.status(200).send({
          policy,
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

  updatePolicy: async (req, res) => {
    try {
      const { id } = req.params;
      const policy = await PolicySchema.findOne({ _id: id })
      if (!policy) {
        return res.status(404).send({
          message: "PolicySchema not found",
          success: false,
        });
      }
      const { policy_title, policy_description } = req.body;
      let policy_file = '';
      if (req.files && req.files.length > 0) {
        policy_file = req.files[0].filename;
        const existingPolicy = await PolicySchema.findById({ _id: policy._id });
        if (existingPolicy && existingPolicy.policy_file) {
          const filePath = path.join('images', existingPolicy.policy_file);
          fs.existsSync(filePath) && fs.unlinkSync(filePath);
        }
      } else {
        const existingPolicy = await PolicySchema.findById({ _id: policy._id });
        if (existingPolicy) {
          policy_file = existingPolicy.policy_file;
        }
      }
      const updatedFields = {
        policy_title,
        policy_description,
        policy_file,
      }
      const updatedDocument = await PolicySchema.findOneAndUpdate(
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

  deletePolicy: async (req, res) => {
    const { id } = req.params;

    try {
      const deletePolicy = await PolicySchema.findOneAndDelete({ _id: id });
      if (!deletePolicy) {
        return res.status(404).json({ success: false, message: "Document not found" });
      }
      //  Delete the associated file
      const filePath = path.join(__dirname, 'images', deletePolicy.policy_file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error) {
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message
      });
    }
  }
};

module.exports = companyController;
