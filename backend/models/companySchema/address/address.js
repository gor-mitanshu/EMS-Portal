// mongoose import
const mongoose = require('mongoose');

// Schema setup
const CompanyAddress = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId },
     company_id: { type: mongoose.Schema.ObjectId },

     register_office_address: { type: String },
     corporate_office_address: { type: String },
     custom_office_address: { type: String },

     deleted_at: { type: Date }
}, { timestamps: true });

// exports and databse collection setup
const CompanyAddressModel = mongoose.model('company-address', CompanyAddress);

// Export the model and the UserRole enum
module.exports = CompanyAddressModel;