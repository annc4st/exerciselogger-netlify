const express = require('express');
const serverlessHttp = require('serverless-http');
const cors = require('cors');
const connectDB = require('../utils/db')
const { deleteWorkout } = require ('../controllers/workoutController')


const app = express()
const router = express.Router();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

// Routes
//for netlify serverless
// app.delete('/.netlify/functions/deleteWorkout', deleteWorkout);

router.delete('/:id', deleteWorkout);
app.use('/.netlify/functions/deleteWorkout', router)




// Export the handler for Netlify
module.exports.handler = serverlessHttp(app);