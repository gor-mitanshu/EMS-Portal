// mongoose import
const mongoose = require('mongoose');

// Schema setup
const announcementSchema = new mongoose.Schema({
     company_id: { type: mongoose.Schema.ObjectId, ref: 'announcement-list' },
     announcement: { type: String },
     deleted_at: { type: Date }

}, { timestamps: true });

// exports and databse collection setup
const AnnouncementData = mongoose.model('announcement', announcementSchema);

// Export the model 
module.exports = AnnouncementData;