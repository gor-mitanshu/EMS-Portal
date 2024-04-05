// mongoose import
const mongoose = require('mongoose');

// Schema setup
const educationSchema = new mongoose.Schema({
     // employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
     // qualification_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Qualification', required: true },

     user_id: { type: mongoose.Schema.ObjectId, ref: 'User' },
     qualification_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Qualification', required: true },

     // educationDetails: [{
     qualification_type: { type: String },
     course_name: { type: String },
     course_type: { type: String },
     course_stream: { type: String },
     course_start_date: { type: String },
     course_end_date: { type: String },
     college_name: { type: String },
     university_name: { type: String },
     // }],
     deleted_at: { type: Date }

}, { timestamps: true });

// exports and databse collection setup
const Education = mongoose.model('education', educationSchema);

// Export the model 
module.exports = Education;