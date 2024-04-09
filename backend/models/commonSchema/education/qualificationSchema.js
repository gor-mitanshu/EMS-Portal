// mongoose import
const mongoose = require('mongoose');

// Schema setup
const qualificationSchema = new mongoose.Schema({
     education_id: { type: mongoose.Schema.Types.ObjectId, ref: 'education' },

     qualification_type: { type: String },
     course_name: { type: String },
     course_type: { type: String },
     course_stream: { type: String },
     course_start_date: { type: String },
     course_end_date: { type: String },
     college_name: { type: String },
     university_name: { type: String },

     deleted_at: { type: Date }
}, { timestamps: true });

// exports and databse collection setup
const Qualification = mongoose.model('qualification', qualificationSchema);

// Export the model 
module.exports = Qualification;