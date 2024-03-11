// mongoose import
const mongoose = require('mongoose');

// Schema setup
const EmployeeSalary = new mongoose.Schema({
     employee_id: { type: mongoose.Schema.ObjectId, ref: 'Employee' },

     ctc: { type: String },
     account_holder_name: { type: String },
     bank_name: { type: String },
     city: { type: String },
     branch_name: { type: String },
     ifsc_code: { type: String },
     account_number: { type: String },
     deleted_at: { type: Date }
}, { timestamps: true });


// exports and databse collection setup
const EmployeeSalaryModel = mongoose.model('employee_salary', EmployeeSalary);

// Export the model
module.exports = EmployeeSalaryModel;