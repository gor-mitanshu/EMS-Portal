// imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
require('dotenv').config();
require('./config/database');

// routes
const companyRoutes = require('./routes/companyRoute');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoute');

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configuration files
app.use("./images", express.static(path.join(__dirname, 'images')));

// use of routes
app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/employee', employeeRoutes);

// PORT
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
     console.log(`Connection Established with port ${PORT}`);
});