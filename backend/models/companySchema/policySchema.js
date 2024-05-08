// mongoose import
const mongoose = require('mongoose');

// Schema setup
const policySchema = new mongoose.Schema({
     company_id: { type: mongoose.Schema.ObjectId, ref: 'company_id' },

     policy_title: { type: String },
     policy_description: { type: String },
     policy_file: { type: String },

     deleted_at: { type: Date }

}, { timestamps: true });

// exports and databse collection setup
const PolicyData = mongoose.model('policy', policySchema);

// Export the model 
module.exports = PolicyData;