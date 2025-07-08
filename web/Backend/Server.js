const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');  // NEW

const adminroutes = require('./Routes/AdminRoutes');
const userroutes = require('./Routes/UserRoutes');
const UserAccessRoutes = require('./Routes/UserAccessRoutes');
const AdminAccessRoutes = require('./Routes/AdminAccessRoutes');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/Ak_Web/Admin', adminroutes);
app.use('/Ak_Web/User', userroutes);
app.use('/Ak_Web/UserAccess', UserAccessRoutes);
app.use('/Ak_Web/Admin/', AdminAccessRoutes);

// Debugging middleware
app.use((req, res, next) => {
  console.log(req.path, req.method, req.body);
  next();
});

// Database connection
mongoose.connect("mongodb+srv://ajithkumar200536:AJITH200536%40ak@ak-solutions-services.6dup5.mongodb.net/yourdbname")
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Database connection error:', err);
  });

// ✅ Export wrapped handler
module.exports = serverless(app);
