const mongoose = require('mongoose');
const certificateSchema = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId, ref: 'user' },
     certificate_name: { type: String },
     certificate_title: { type: String },
     certificate_file: { type: String },
     deleted_at: { type: Date, default: null }

}, { timestamps: true });
const CertificateSchema = mongoose.model('certificate', certificateSchema);
module.exports = CertificateSchema;