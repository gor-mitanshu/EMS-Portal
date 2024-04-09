// mongoose import
const mongoose = require('mongoose');

// Schema setup
const educationSchema = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId, ref: 'user' },

     deleted_at: { type: Date }

}, { timestamps: true });

// exports and databse collection setup
const Education = mongoose.model('education', educationSchema);

// Export the model 
module.exports = Education;