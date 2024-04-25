// mongoose import
const mongoose = require('mongoose');

// Schema setup
const announcementDataSchema = new mongoose.Schema({
     announcement_id: { type: mongoose.Schema.ObjectId, ref: 'announcement' },

     announcement: { type: String },

     deleted_at: { type: Date }

}, { timestamps: true });

// exports and databse collection setup
const AnnouncementData = mongoose.model('announcement-data', announcementDataSchema);

// Export the model 
module.exports = AnnouncementData;