const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId, ref: 'user' },
     document_type: { type: String },
     document_id: { type: String },
     photo_id: { type: Boolean },
     date_of_birth: { type: Boolean },
     current_address: { type: Boolean },
     permanent_address: { type: Boolean },
     document_file: { type: String },
     deleted_at: { type: Date, default: null }

}, { timestamps: true });
const DocumentSchema = mongoose.model('document', documentSchema);
module.exports = DocumentSchema;