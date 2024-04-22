// mongoose import
const mongoose = require('mongoose');

// Schema setup
const Overview = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId },
     company_id: { type: mongoose.Schema.ObjectId },

     register_company: { type: String },
     brand_name: { type: String },
     company_official_email: { type: String },
     company_official_contact: { type: String },
     website: { type: String },
     domain_name: { type: String },
     industry_type: { type: String },
     company_social_profile: {
          linked_in: { type: String },
          facebook: { type: String },
          twitter: { type: String }
     },

     deleted_at: { type: Date }
}, { timestamps: true });


// exports and databse collection setup
const OverviewModel = mongoose.model('overview', Overview);

// Export the model and the UserRole enum
module.exports = OverviewModel;