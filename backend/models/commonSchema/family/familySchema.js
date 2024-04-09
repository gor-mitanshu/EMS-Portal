// mongoose import
const mongoose = require('mongoose');

// Schema setup
const familySchema = new mongoose.Schema({
     user_id: { type: mongoose.Schema.ObjectId, ref: 'user' },

     deleted_at: { type: Date }

}, { timestamps: true });

// exports and databse collection setup
const family = mongoose.model('family', familySchema);

// Export the model 
module.exports = family;