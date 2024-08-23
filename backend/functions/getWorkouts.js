const express = require('express');
const serverlessHttp = require('serverless-http');
const cors = require('cors');
const { getAllWorkouts } = require ('../controllers/workoutController')
const connectDB = require('../utils/db')
const requireAuth = require('../middleware/requireAuth')


const app = express()
const router = express.Router();

// Middleware
app.use(cors({
  origin: ['https://gymswimworkouts.netlify.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
}));
app.use(express.json());

connectDB();

// Routes
//for netlify serverless
// app.get('/.netlify/functions/getWorkouts', getAllWorkouts);

router.get('/', requireAuth, getAllWorkouts)
app.use('/.netlify/functions/getWorkouts', router)


// Export the handler for Netlify
module.exports.handler = serverlessHttp(app);
