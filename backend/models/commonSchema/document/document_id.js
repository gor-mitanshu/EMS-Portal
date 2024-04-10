// mongoose import
const mongoose = require('mongoose');

// Schema setup
const documentSchema = new mongoose.Schema({
     document_list_id: { type: mongoose.Schema.ObjectId, ref: 'document-list' },

     document_name: { type: String },
     document_id: { type: String },
     proof: [{ type: String }],
     document_file: { type: String },
     deleted_at: { type: Date }

}, { timestamps: true });

// exports and databse collection setup
const Document = mongoose.model('document', documentSchema);

// Export the model 
module.exports = Document;