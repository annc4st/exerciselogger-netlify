const express = require('express');
const serverlessHttp = require('serverless-http');
const cors = require('cors');
const { getAllWorkouts } = require ('../controllers/workoutController')
const connectDB = require('../utils/db')
const router = express.Router();


const app = express()

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
//for netlify serverless
app.get('/.netlify/functions/getWorkouts', getAllWorkouts);

//for local server
router.get('/', getAllWorkouts);

module.exports = router;


// Export the handler for Netlify
module.exports.handler = serverlessHttp(app);
