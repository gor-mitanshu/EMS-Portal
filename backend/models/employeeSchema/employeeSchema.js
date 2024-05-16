const mongoose = require('mongoose');
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
     deleted_at: { type: Date, default: null }
}, { timestamps: true });
const EmployeeSchema = mongoose.model('employee', Employee);
module.exports = EmployeeSchema;