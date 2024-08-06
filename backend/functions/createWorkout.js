const express = require('express');
const serverlessHttp = require('serverless-http');
const cors = require('cors');
const connectDB = require('../utils/db')
const router = express.Router();
const { addWorkout } = require ('../controllers/workoutController')


const app = express()

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
//for netlify serverless
app.post('/.netlify/functions/createWorkout', addWorkout);
//for local server
router.post('/', addWorkout);

module.exports = router;


// Export the handler for Netlify
module.exports.handler = serverlessHttp(app);
