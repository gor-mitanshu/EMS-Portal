const mongoose = require('mongoose');
const subDepartmentSchema = new mongoose.Schema({
     department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'department' },
     sub_departments: { type: String },
     deleted_at: { type: Date, default: null }
}, { timestamps: true });
const SubDepartmentSchema = mongoose.model('subDepartment', subDepartmentSchema);
module.exports = SubDepartmentSchema;
