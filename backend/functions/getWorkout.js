const express = require('express');
const serverlessHttp = require('serverless-http');
const { getWorkout } = require('../controllers/workoutController');
const connectDB = require('../utils/db');
const cors = require('cors');
const requireAuth = require('../middleware/requireAuth')


const app = express();
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

//Routes
// app.get('/.netlify/functions/getWorkout/:id', getWorkout);

router.get('/:id', requireAuth, getWorkout);
app.use('/.netlify/functions/getWorkout', router);



module.exports.handler = serverlessHttp(app);