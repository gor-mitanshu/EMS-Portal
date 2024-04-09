// mongoose import
const mongoose = require('mongoose');

// Schema setup
const documentSchema = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId, ref: 'user' },

     document_name: [{ type: String }],
     document_id: { type: String },
     proof: [{ type: String }],
     document_file: { type: String },
     deleted_at: { type: Date }

}, { timestamps: true });

// exports and databse collection setup
const Document = mongoose.model('document', documentSchema);

// Export the model 
module.exports = Document;