// mongoose import
const mongoose = require('mongoose');

// Schema setup
const policyDataSchema = new mongoose.Schema({
     policy_id: { type: mongoose.Schema.ObjectId, ref: 'policy' },

     policy_title: { type: String },
     policy_description: { type: String },
     policy_file: { type: String },

     deleted_at: { type: Date }

}, { timestamps: true });

// exports and databse collection setup
const PolicyData = mongoose.model('policy-data', policyDataSchema);

// Export the model 
module.exports = PolicyData;