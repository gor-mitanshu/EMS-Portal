// mongoose import
const mongoose = require('mongoose');

// Schema setup
const subDepartmentSchema = new mongoose.Schema({
     department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'department' },
     sub_departments: { type: String },

     deleted_at: { type: Date }

}, { timestamps: true });

// exports and databse collection setup
const SubDepartment = mongoose.model('subDepartment', subDepartmentSchema);

// Export the model 
module.exports = SubDepartment;
