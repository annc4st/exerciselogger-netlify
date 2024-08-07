
require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('SECRET:', process.env.SECRET);
console.log('PORT:', process.env.PORT);

const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./utils/db');

const workoutRoutes = require('./routes/workoutRoutes');
const apiRoute = require('./routes/apiRoute')
const userRouter = require('./routes/userRouter')

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', apiRoute);
app.use('/api/workouts', workoutRoutes);
app.use('/api/auth', userRouter)
 

// Start the server
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
