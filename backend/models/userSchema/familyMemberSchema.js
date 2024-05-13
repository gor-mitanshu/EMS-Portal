const mongoose = require('mongoose');
const familyMemberSchema = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId, ref: 'user' },

     family_name: { type: String },
     family_relationship: { type: String },
     family_birth_date: { type: Date },
     dependant: { type: String },
     deleted_at: { type: Date, default: null }

}, { timestamps: true });
const FamilyMemberSchema = mongoose.model('family-member', familyMemberSchema);
module.exports = FamilyMemberSchema;