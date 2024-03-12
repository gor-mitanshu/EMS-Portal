// mongoose import
const mongoose = require('mongoose');

// Schema setup
const Company = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId },

     company_name: { type: String },
     register_office: { type: String },
     company_size: { type: String },
     employee_no: { type: String },
     set_time_shift: {
          inTime: { type: Date },
          out_time: { type: Date },
          garce_time: { type: Date },
          working_hours: { type: String }
     },
     deleted_at: { type: Date }
}, { timestamps: true });


// exports and databse collection setup
const CompanyModel = mongoose.model('company', Company);

// Export the model and the UserRole enum
module.exports = CompanyModel;