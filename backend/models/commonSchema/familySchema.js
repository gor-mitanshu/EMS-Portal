// mongoose import
const mongoose = require('mongoose');

// Schema setup
const familySchema = new mongoose.Schema({
     name: { type: String },
     relationship: { type: String },
     date_of_birth: { type: Date },
     dependant: { type: String },
     deleted_at: { type: Date }
}, { timestamps: true });

// exports and databse collection setup
const family = mongoose.model('family', familySchema);

// Export the model 
module.exports = family;