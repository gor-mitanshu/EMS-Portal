const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
     company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'company' },
     department: { type: String },
     deleted_at: { type: Date, default: null }

}, { timestamps: true });
const DepartmentSchema = mongoose.model('department', departmentSchema);
module.exports = DepartmentSchema;
