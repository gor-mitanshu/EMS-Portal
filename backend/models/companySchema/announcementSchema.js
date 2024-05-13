const mongoose = require('mongoose');
const announcementSchema = new mongoose.Schema({
     company_id: { type: mongoose.Schema.ObjectId, ref: 'announcement-list' },
     announcement: { type: String },
     deleted_at: { type: Date, default: null }
}, { timestamps: true });
const AnnouncementSchema = mongoose.model('announcement', announcementSchema);
module.exports = AnnouncementSchema;