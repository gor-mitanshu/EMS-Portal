// mongoose import
const mongoose = require('mongoose');

// Schema setup
const emergencyfamilyMemberSchema = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId, ref: 'user' },
     family_name: { type: String },
     family_relationship: { type: String },
     family_birth_date: { type: Date },
     dependant: { type: String },
     deleted_at: { type: Date }
}, { timestamps: true });

// exports and databse collection setup
const emergencyfamilyMember = mongoose.model('emergency-family-member', emergencyfamilyMemberSchema);

// Export the model 
module.exports = emergencyfamilyMember;