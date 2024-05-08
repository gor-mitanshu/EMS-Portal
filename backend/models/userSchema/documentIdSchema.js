// mongoose import
const mongoose = require('mongoose');

// Schema setup
const documentSchema = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId, ref: 'user' },
     document_type: { type: String },
     document_id: { type: String },
     photo_id: { type: Boolean },
     date_of_birth: { type: Boolean },
     current_address: { type: Boolean },
     permanent_address: { type: Boolean },
     document_file: { type: String },
     deleted_at: { type: Date }

}, { timestamps: true });

// exports and databse collection setup
const Document = mongoose.model('document', documentSchema);

// Export the model
module.exports = Document;