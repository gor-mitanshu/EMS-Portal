// mongoose import
const mongoose = require('mongoose');

// Schema setup
const familyMemberSchema = new mongoose.Schema({
     family_id: { type: mongoose.Schema.Types.ObjectId, ref: 'family' },

     family_name: { type: String },
     family_relationship: { type: String },
     family_birth_date: { type: Date },
     dependant: { type: String },
     deleted_at: { type: Date }
}, { timestamps: true });

// exports and databse collection setup
const familyMember = mongoose.model('family-member', familyMemberSchema);

// Export the model 
module.exports = familyMember;