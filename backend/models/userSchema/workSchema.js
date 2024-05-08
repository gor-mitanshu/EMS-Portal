// mongoose import
const mongoose = require('mongoose');

// Schema setup
const workSchema = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId, ref: 'user' },
     work_name: { type: String },
     work_description: { type: String },
     work_file: { type: String },
     deleted_at: { type: Date }
}, { timestamps: true });

// exports and databse collection setup
const Work = mongoose.model('work', workSchema);

// Export the model 
module.exports = Work;