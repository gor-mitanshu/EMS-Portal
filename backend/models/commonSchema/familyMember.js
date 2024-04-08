// mongoose import
const mongoose = require('mongoose');

// Schema setup
const familyMemberSchema = new mongoose.Schema({
     family_id: { type: mongoose.Schema.Types.ObjectId, ref: 'family' },

     name: { type: String },
     relationship: { type: String },
     date_of_birth: { type: Date },
     dependant: { type: String },
     deleted_at: { type: Date }
}, { timestamps: true });

// exports and databse collection setup
const familyMember = mongoose.model('family-member', familyMemberSchema);

// Export the model 
module.exports = familyMember;