const mongoose = require('mongoose');
const leaveSchema = new mongoose.Schema({
     company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
     casual: { type: String, enum: ['annual', 'credit'] },
     earned: { type: String, enum: ['annual', 'credit'] },
     sick: { type: String, enum: ['annual', 'credit'] },
     deleted_at: { type: Date, default: null }
     ,
}, { timestamps: true });
const LeaveSchema = mongoose.model('leave', leaveSchema);
module.exports = LeaveSchema;