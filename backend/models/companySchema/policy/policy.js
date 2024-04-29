// mongoose import
const mongoose = require('mongoose');

// Schema setup
const policySchema = new mongoose.Schema({
     company_id: { type: mongoose.Schema.ObjectId, ref: 'policy-list' },

     deleted_at: { type: Date }

}, { timestamps: true });

// exports and databse collection setup
const Policy = mongoose.model('policy', policySchema);

// Export the model 
module.exports = Policy;