// mongoose import
const mongoose = require('mongoose');

// Schema setup
const announcementSchema = new mongoose.Schema({
     company_id: { type: mongoose.Schema.ObjectId, ref: 'announcement-list' },

     deleted_at: { type: Date }

}, { timestamps: true });

// exports and databse collection setup
const Announcement = mongoose.model('announcement', announcementSchema);

// Export the model 
module.exports = Announcement;