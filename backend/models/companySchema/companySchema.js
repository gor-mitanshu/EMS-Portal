const mongoose = require('mongoose');
const Company = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId },
     company_name: { type: String },
     company_size: { type: String },
     register_office: { type: String },
     employee_no: { type: String },
     set_time_shift: {
          inTime: { type: Date },
          out_time: { type: Date },
          garce_time: { type: Date },
          working_hours: { type: String }
     },
     brand_name: { type: String },
     company_official_email: { type: String },
     company_official_contact: { type: String },
     website: { type: String },
     domain_name: { type: String },
     industry_type: { type: String },
     company_address: { type: String },
     linked_in: { type: String },
     facebook: { type: String },
     twitter: { type: String },
     register_office_address: { type: String },
     corporate_office_address: { type: String },
     custom_office_address: { type: String },
     deleted_at: { type: Date, default: null }
}, { timestamps: true });
const CompanySchema = mongoose.model('company', Company);
module.exports = CompanySchema;