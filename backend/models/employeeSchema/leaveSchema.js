// mongoose import
const mongoose = require('mongoose');

// Schema setup
const leaveSchema = new mongoose.Schema({
     leave_name: {
          casual: { type: String, enum: ['annual', 'credit'] },
          earned: { type: String, enum: ['annual', 'credit'] },
          sick: { type: String, enum: ['annual', 'credit'] }
     },
     company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
     created_at: { type: Date, default: Date.now },
     updated_at: { type: Date, default: Date.now },
     deleted_at: { type: Date }
});

// exports and databse collection setup
const Leave = mongoose.model('leave', leaveSchema);

// Export the model and the UserRole enum
module.exports = Leave;