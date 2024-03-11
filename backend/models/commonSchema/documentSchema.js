// mongoose import
const mongoose = require('mongoose');

// Schema setup
const documentSchema = new mongoose.Schema({
     document: {
          document_name: [{ type: String }],
          document_id: { type: String },
          proof: [{ type: String }],
          document_file: { type: String },
          deleted_at: { type: Date }
     },
     certificate_document: {
          certificate_name: [{ type: String }],
          certificate_title: { type: String },
          certificate_file: { type: String },
          deleted_at: { type: Date }
     },
     work_document: {
          work_title: { type: String },
          work_description: { type: String },
          work_file: { type: String },
          deleted_at: { type: Date }
     },
     deleted_at: { type: Date }
}, { timestamps: true });

// exports and databse collection setup
const Document = mongoose.model('documents', documentSchema);

// Export the model 
module.exports = Document;