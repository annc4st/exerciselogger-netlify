

require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('SECRET:', process.env.SECRET);
console.log('PORT:', process.env.PORT);

const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');

const workoutRoutes = require('./functions/getWorkouts');
const apiRoutes = require('./functions/api')
const singleWorkoutRoutes = require('./functions/getWorkout');
const createWorkout = require('./functions/createWorkout')
const deleteWorkout = require('./functions/deleteWorkout')
const updateWorkout = require('./functions/updateWorkout')

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = require('./utils/db');
connectDB();

// Routes
app.use('/api', apiRoutes);
app.use('/api/workouts', workoutRoutes, singleWorkoutRoutes, createWorkout, deleteWorkout, updateWorkout );
 

// Start the server
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
