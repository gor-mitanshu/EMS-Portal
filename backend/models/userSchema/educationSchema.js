const mongoose = require('mongoose');
const educationSchema = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId, ref: 'user' },
     qualification_type: { type: String },
     course_name: { type: String },
     course_type: { type: String },
     course_stream: { type: String },
     course_start_date: { type: String },
     course_end_date: { type: String },
     college_name: { type: String },
     university_name: { type: String },
     deleted_at: { type: Date, default: null }

}, { timestamps: true });
const EducationSchema = mongoose.model('education', educationSchema);
module.exports = EducationSchema;