// mongoose import
const mongoose = require('mongoose');

// Schema setup
const Employee = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId, ref: 'User' },
     company_id: { type: mongoose.Schema.ObjectId, ref: 'Company' },
     employee_family_details_id: { type: mongoose.Schema.ObjectId, ref: 'Family' },

     employee_code: { type: String },
     date_of_joining: { type: String },
     probation_period: { type: String },
     employment_type: { type: String },
     work_location: { type: String },
     employee_status: { type: String },
     work_experience: { type: String },

     designation: { type: String },
     job_title: { type: String },
     department: { type: String },
     sub_department: { type: String },

     resignation_date: { type: Date },
     resignation_status: { type: String },
     notice_period: { type: String },
     last_working_day: { type: String },

     // address: { type: String },
     // house_type: { type: String },
     // staying_current_residence: { type: String },
     // living_current_city: { type: String },
     // reporting_manager: { type: String },
     deleted_at: { type: Date }
}, { timestamps: true });


// exports and databse collection setup
const EmployeeModel = mongoose.model('employee', Employee);

// Export the model and the UserRole enum
module.exports = EmployeeModel;