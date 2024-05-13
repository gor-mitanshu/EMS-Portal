const mongoose = require('mongoose');
const User = new mongoose.Schema({
     firstName: { type: String, required: true },
     lastName: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     phone: { type: String },
     password: { type: String, required: true },
     birth_date: { type: Date },
     gender: { type: String, enum: ['male', 'female', 'other'] },
     blood_group: { type: String },
     marital_status: { type: String, enum: ['single', 'married', 'divorced', 'widowed'] },
     current_address: { type: String },
     linked_in: { type: String },
     facebook: { type: String },
     twitter: { type: String },
     image: { type: String },
     role: { type: String, enum: ['company', 'employee', 'hr', 'admin'], required: true },
     is_email_verified: { type: Boolean, default: false },
     verification_token: { type: String },
     forget_password_otp: { type: String },
     forget_password_otp_expiry: { type: Date },
     deleted_at: { type: Date, default: null }
}, { timestamps: true });
const UserSchema = mongoose.model('user', User);
module.exports = UserSchema;