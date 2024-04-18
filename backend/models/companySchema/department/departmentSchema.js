// mongoose import
const mongoose = require('mongoose');

// Schema setup
const departmentSchema = new mongoose.Schema({
     company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'company' },
     department: { type: String },

     deleted_at: { type: Date }

}, { timestamps: true });

// exports and databse collection setup
const Department = mongoose.model('department', departmentSchema);

// Export the model 
module.exports = Department;
