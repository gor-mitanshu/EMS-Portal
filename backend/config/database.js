// mongo connection imports
const mongoose = require('mongoose');
require('dotenv').config();

// Mongo Connection
mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}`).then(() => {
     console.log(`Connection Established with Database`);
}).catch((err) => {
     console.log(err.message)
});