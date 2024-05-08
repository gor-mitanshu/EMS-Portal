// mongoose import
const mongoose = require('mongoose');

// Schema setup
const certificateSchema = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId, ref: 'user' },
     certificate_name: { type: String },
     certificate_title: { type: String },
     certificate_file: { type: String },
     deleted_at: { type: Date }
}, { timestamps: true });

// exports and databse collection setup
const Certificate = mongoose.model('certificate', certificateSchema);

// Export the model 
module.exports = Certificate;