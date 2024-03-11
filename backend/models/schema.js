// User Schema
const User = new mongoose.Schema({
     name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     phone: { type: String },
     is_verified: {
          email: { type: Boolean, default: false },
          phone: { type: Boolean, default: false }
     },
     role: { type: String, enum: ['company', 'employee', 'hr', 'admin'], required: true },
     password: { type: String, required: true },
     birth_date: { type: Date },
     gender: { type: String, enum: ['male', 'female', 'other'] },
     blood_group: { type: String },
     marital_status: { type: String, enum: ['single', 'married', 'divorced', 'widowed'] },
     image: { type: String },
     deleted_at: { type: Date }
}, { timestamps: true });

// Qualification Schema
const Qualification = new mongoose.Schema({
     qualification_name: { type: String, required: true },
     created_at: { type: Date, default: Date.now },
     updated_at: { type: Date, default: Date.now },
     deleted_at: { type: Date }
});

// Family Schema
const Family = new mongoose.Schema({
     name: { type: String },
     relationship: { type: String },
     number: { type: String },
     deleted_at: { type: Date }
}, { timestamps: true });

// Education Schema
const Education = new mongoose.Schema({
     employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
     qualification_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Qualification', required: true },
     created_at: { type: Date, default: Date.now },
     updated_at: { type: Date, default: Date.now },
     deleted_at: { type: Date }
});

// Document Schema
const Document = new mongoose.Schema({
     document: {
          document_name: [{ type: String }],
          document_id: { type: String },
          proof: [{ type: String }],
          document_file: { type: String },
          deleted_at: { type: Date }
     },
     certificate_document: {
          certificate_name: [{ type: String }],
          certificate_title: { type: String },
          certificate_file: { type: String },
          deleted_at: { type: Date }
     },
     work_document: {
          work_title: { type: String },
          work_description: { type: String },
          work_file: { type: String },
          deleted_at: { type: Date }
     },
     deleted_at: { type: Date }
}, { timestamps: true });

// Company Schema
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

// Employee Schema
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
     deleted_at: { type: Date }
}, { timestamps: true });

// Leave Schema
const Leave = new mongoose.Schema({
     leave_name: {
          casual: { type: String, enum: ['annual', 'credit'] },
          earned: { type: String, enum: ['annual', 'credit'] },
          sick: { type: String, enum: ['annual', 'credit'] }
     },
     company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
     created_at: { type: Date, default: Date.now },
     updated_at: { type: Date, default: Date.now },
     deleted_at: { type: Date }
});

// Employee Salary Schema
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

// Export models
const UserModel = mongoose.model('User', User);
const QualificationModel = mongoose.model('Qualification', Qualification);
const FamilyModel = mongoose.model('Family', Family);
const EducationModel = mongoose.model('Education', Education);
const DocumentModel = mongoose.model('Document', Document);
const CompanyModel = mongoose.model('Company', Company);
const EmployeeModel = mongoose.model('Employee', Employee);
const LeaveModel = mongoose.model('Leave', Leave);
const EmployeeSalaryModel = mongoose.model('EmployeeSalary', EmployeeSalary);

module.exports = {
     UserModel,
     QualificationModel,
     FamilyModel,
     EducationModel,
     DocumentModel,
     CompanyModel,
     EmployeeModel,
     LeaveModel,
     EmployeeSalaryModel
};
