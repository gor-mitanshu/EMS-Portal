// mongoose import
const mongoose = require('mongoose');

// Schema setup
const Employee = new mongoose.Schema({
     company_id: { type: mongoose.Schema.ObjectId, ref: 'Company' },
     user_id: { type: mongoose.Schema.ObjectId, ref: 'User' },
     employee_family_details_id: { type: mongoose.Schema.ObjectId, ref: 'Family' },

     address: { type: String },
     house_type: { type: String },
     staying_current_residence: { type: String },
     living_current_city: { type: String },
     date_of_joining: { type: String },
     employee_id: { type: String },
     department: { type: String },
     sub_department: { type: String },
     designation: { type: String },
     job_title: { type: String },
     reporting_manager: { type: String },
     work_location: { type: String },
     employment_type: { type: String },
     probabtion_period: { type: String },
     employee_status: { type: String },
     deleted_at: { type: Date }
}, { timestamps: true });


// exports and databse collection setup
const EmployeeModel = mongoose.model('employee', Employee);

// Export the model and the UserRole enum
module.exports = EmployeeModel;