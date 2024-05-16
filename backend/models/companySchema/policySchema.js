const mongoose = require('mongoose');
const policySchema = new mongoose.Schema({
     company_id: { type: mongoose.Schema.ObjectId, ref: 'company_id' },
     title: { type: String },
     description: { type: String },
     file: { type: String },
     deleted_at: { type: Date, default: null }

}, { timestamps: true });
const PolicySchema = mongoose.model('policy', policySchema);
module.exports = PolicySchema;