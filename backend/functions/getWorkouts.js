const express = require('express');
const serverlessHttp = require('serverless-http');
const cors = require('cors');
const { getAllWorkouts } = require ('../controllers/workoutController')
const connectDB = require('../utils/db')


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
// app.get('/.netlify/functions/getWorkouts', getAllWorkouts);

router.get('/', getAllWorkouts)
app.use('/.netlify/functions/getWorkouts', router)


// Export the handler for Netlify
module.exports.handler = serverlessHttp(app);
