// imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// middlewares
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configuration files
require('./config/database');

// routes
const companyRoutes = require('./routes/companyRoute');
const commonRoutes = require('./routes/commonRoutes');

// use of routes
app.use('', commonRoutes);
app.use('/company', companyRoutes);

// PORT
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
     console.log(`Connection Established with port ${PORT}`);
});