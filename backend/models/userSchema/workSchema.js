const mongoose = require('mongoose');
const workSchema = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId, ref: 'user' },
     work_name: { type: String },
     work_description: { type: String },
     work_file: { type: String },
     deleted_at: { type: Date, default: null }

}, { timestamps: true });
const WorkSchema = mongoose.model('work', workSchema);
module.exports = WorkSchema;