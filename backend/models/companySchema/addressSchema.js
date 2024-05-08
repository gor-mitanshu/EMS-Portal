const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId },
     company_id: { type: mongoose.Schema.ObjectId },

     register_office_address: { type: String },
     corporate_office_address: { type: String },
     custom_office_address: { type: String },

     deleted_at: { type: Date }
}, { timestamps: true });

const CompanyAddressModel = mongoose.model('company-address', addressSchema);

module.exports = CompanyAddressModel;