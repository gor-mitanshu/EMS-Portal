const mongoose = require('mongoose');
const EmployeeSalary = new mongoose.Schema({
     employee_id: { type: mongoose.Schema.ObjectId, ref: 'Employee' },
     ctc: { type: String },
     account_holder_name: { type: String },
     bank_name: { type: String },
     city: { type: String },
     branch_name: { type: String },
     ifsc_code: { type: String },
     account_number: { type: String },
     deleted_at: { type: Date, default: null }

}, { timestamps: true });
const EmployeeSalarySchema = mongoose.model('employee_salary', EmployeeSalary);
module.exports = EmployeeSalarySchema;