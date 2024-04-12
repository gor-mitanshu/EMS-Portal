// mongoose import
const mongoose = require('mongoose');

// Schema setup
const documentSchema = new mongoose.Schema({
     document_list_id: { type: mongoose.Schema.ObjectId, ref: 'document-list' },

     document_type: { type: String },
     document_id: { type: String },
     proof: {
          photo_id: Boolean,
          date_of_birth: Boolean,
          current_address: Boolean,
          permanent_address: Boolean,
     },
     document_file: { type: String },
     deleted_at: { type: Date }

}, { timestamps: true });

// exports and databse collection setup
const Document = mongoose.model('document', documentSchema);

// Export the model
module.exports = Document;