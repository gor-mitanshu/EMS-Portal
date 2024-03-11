// mongoose import
const mongoose = require('mongoose');

// created role
const UserRole = {
     COMPANY: 'company',
     EMPLOYEE: 'employee',
     HR: 'hr',
     ADMIN: 'admin'
};

// Schema setup
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


// exports and databse collection setup
const UserModel = mongoose.model('user', User);

// Export the model and the UserRole enum
module.exports = { UserModel, UserRole };