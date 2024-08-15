const express = require('express');
const serverlessHttp = require('serverless-http');
const cors = require('cors');
const connectDB = require('../utils/db')
const { updateWorkout } = require ('../controllers/workoutController')


const app = express()
const router = express.Router();

// Middleware
app.use(cors({
    origin: 'https://gymswimworkouts.netlify.app'
  }
));
app.use(express.json());

connectDB();

// Routes
//for netlify serverless
// app.patch('/.netlify/functions/updateWorkout/:id', updateWorkout);
 
router.patch('/:id', updateWorkout);
app.use('/.netlify/functions/updateWorkout', router)


// Export the handler for Netlify
module.exports.handler = serverlessHttp(app);