require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongoose').Types;

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

  addDepartment: async (req, res) => {
    try {
      const { id } = req.params;
      const { department, sub_departments } = req.body;

      // Create the department
      const savedDepartment = await DepartmentSchema.create({ company_id: id, department });

      // Create sub-departments if provided
      if (sub_departments && sub_departments.length > 0) {
        const subDep = sub_departments.map(sub_department => ({
          department_id: savedDepartment._id,
          sub_departments: sub_department
        }));

        // Ensure only unique sub-departments are inserted
        const uniqueSubDep = subDep.reduce((unique, o) => {
          if (!unique.some(obj => obj.sub_departments === o.sub_departments)) {
            unique.push(o);
          }
          return unique;
        }, []);

        await SubDepartmentSchema.insertMany(uniqueSubDep);
      }

      res.status(201).json(savedDepartment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getDepartments: async (req, res) => {
    try {
      const { id } = req.params;
      const departments = await DepartmentSchema.aggregate([
        {
          $match: { company_id: new ObjectId(id) }
        },
        {
          $lookup: {
            from: "subdepartments",
            localField: "_id",
            foreignField: "department_id",
            as: "subdepartments"
          }
        },
        // {
        //   $project: {
        //     _id: 1,
        //     department: 1,
        //     subdepartments: {
        //       $map: {
        //         input: "$subdepartments",
        //         as: "subdepartment",
        //         in: "$$subdepartment"
        //       }
        //     }
        //   }
        // }
      ]);

      res.status(200).json(departments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  deleteDepartmentById: async (req, res) => {
    try {
      const { id } = req.params;
      const department = await DepartmentSchema.findByIdAndDelete(id);
      const subDepartment = await SubDepartmentSchema.deleteMany({ department_id: id });
      if (department && subDepartment) {
        res.status(200).json({ message: 'Department and its sub-departments deleted successfully' });
      } else {
        res.status(401).json({ message: 'Department and its sub-departments deleted Unsuccessfully' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  deleteSubDepartmentById: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteSubDepartment = await SubDepartmentSchema.findByIdAndDelete(id);
      if (deleteSubDepartment) {
        res.status(200).json({ message: 'Sub-department deleted successfully' });
      } else {
        res.status(401).json({ message: 'Sub-departments deleted Unsuccessfully' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  updateDepartmentNameById: async (req, res) => {
    try {
      const { id } = req.params;
      const { department } = req.body;

      // Update the department name
      await DepartmentSchema.findByIdAndUpdate(id, { department });

      res.status(200).json({ message: 'Department name updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  updateSubDepartmentNameById: async (req, res) => {
    try {
      const { id } = req.params;
      const { sub_departments } = req.body;

      // Update the sub-department name
      await SubDepartmentSchema.findByIdAndUpdate(id, { sub_departments });

      res.status(200).json({ message: 'Sub-department name updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Announcement
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
        { $set: { announcement } },
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
    let { title, description } = req.body;
    try {
      let file = '';
      if (req.files && req.files.length > 0) {
        file = req.files[0].filename;
      }
      const policyData = new PolicySchema({
        company_id: id,
        title,
        description,
        file: file,
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
          message: "Policy not found",
          success: false,
        });
      }
      const { title, description } = req.body;
      let file = '';
      console.log(req.files)
      if (req.files && req.files.length > 0) {
        file = req.files[0].filename;
        const existingPolicy = await PolicySchema.findById({ _id: policy._id });
        if (existingPolicy && existingPolicy.file) {
          const filePath = path.join('files', existingPolicy.file);
          fs.existsSync(filePath) && fs.unlinkSync(filePath);
        }
      } else {
        const existingPolicy = await PolicySchema.findById({ _id: policy._id });
        if (existingPolicy) {
          file = existingPolicy.file;
        }
      }
      const updatedFields = {
        title,
        description,
        file,
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
      const filePath = path.join('files', deletePolicy.file);
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
