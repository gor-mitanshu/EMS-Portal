// mongoose import
const mongoose = require('mongoose');

// Schema setup
const qualificationSchema = new mongoose.Schema({
     qualification_name: { type: String, required: true },
     deleted_at: { type: Date }
}, { timestamps: true });

// exports and databse collection setup
const Qualification = mongoose.model('qualification', qualificationSchema);

// Export the model 
module.exports = Qualification;