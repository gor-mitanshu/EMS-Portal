// mongoose import
const mongoose = require('mongoose');

// Schema setup
const educationSchema = new mongoose.Schema({
     employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
     qualification_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Qualification', required: true },
     deleted_at: { type: Date }
}, { timestamps: true });

// exports and databse collection setup
const Education = mongoose.model('education', educationSchema);

// Export the model 
module.exports = Education;