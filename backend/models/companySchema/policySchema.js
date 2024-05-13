const mongoose = require('mongoose');
const policySchema = new mongoose.Schema({
     company_id: { type: mongoose.Schema.ObjectId, ref: 'company_id' },
     policy_title: { type: String },
     policy_description: { type: String },
     policy_file: { type: String },
     deleted_at: { type: Date, default: null }

}, { timestamps: true });
const PolicySchema = mongoose.model('policy', policySchema);
module.exports = PolicySchema;