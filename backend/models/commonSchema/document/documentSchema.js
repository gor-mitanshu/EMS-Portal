// mongoose import
const mongoose = require('mongoose');

// Schema setup
const documentListSchema = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId, ref: 'user' },

     deleted_at: { type: Date }
}, { timestamps: true });

// exports and databse collection setup
const DocumentList = mongoose.model('document-list', documentListSchema);

// Export the model 
module.exports = DocumentList;