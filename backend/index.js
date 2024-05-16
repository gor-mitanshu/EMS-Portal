const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
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

// Serve static files from the 'files' directory
const staticFilesPath = path.join(__dirname, 'files');
if (!fs.existsSync(staticFilesPath)) {
     fs.mkdirSync(staticFilesPath);
}
app.use('/files', express.static(staticFilesPath));

// use of routes
app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/employee', employeeRoutes);

// PORT
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
     console.log(`Connection Established with port ${PORT}`);
});