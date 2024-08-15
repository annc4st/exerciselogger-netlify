const express = require('express');
const serverlessHttp = require('serverless-http');
const cors = require('cors');
const connectDB = require('../utils/db')
const { deleteWorkout } = require ('../controllers/workoutController')


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
// app.delete('/.netlify/functions/deleteWorkout', deleteWorkout);

router.delete('/:id', deleteWorkout);
app.use('/.netlify/functions/deleteWorkout', router)

// Handle CORS preflight requests
app.options('*', cors());

app.use((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});


// Export the handler for Netlify
module.exports.handler = serverlessHttp(app);