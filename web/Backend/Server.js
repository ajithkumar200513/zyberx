const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const adminroutes = require('./Routes/AdminRoutes');
const userroutes = require('./Routes/UserRoutes');
const UserAccessRoutes = require('./Routes/UserAccessRoutes');
const AdminAccessRoutes = require('./Routes/AdminAccessRoutes')
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/Ak_Web/Admin', adminroutes);
app.use('/Ak_Web/User', userroutes); // General user routes
app.use('/Ak_Web/UserAccess', UserAccessRoutes); // Specific user access routes
app.use('/Ak_Web/Admin/', AdminAccessRoutes)
// Debugging middleware
app.use((req, res, next) => {
    console.log(req.path, req.method, req.body);
    next();
});
// Database connection
mongoose.connect("mongodb+srv://ajithkumar200536:AJITH200536%40ak@ak-solutions-services.6dup5.mongodb.net/yourdbname")
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log('Listening for requests on port', PORT);
        });
    })
    .catch((err) => {
        console.log('Database connection error:', err);
    });
