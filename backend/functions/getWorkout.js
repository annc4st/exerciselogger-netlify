const express = require('express');
const serverlessHttp = require('serverless-http');
const { getWorkout } = require('../controllers/workoutController');
const connectDB = require('../utils/db');
const cors = require('cors');


const app = express();
const router = express.Router();

// Middleware
app.use(cors({
    origin: 'https://gymswimworkouts.netlify.app'
  }
));
app.use(express.json());

connectDB();

//Routes
// app.get('/.netlify/functions/getWorkout/:id', getWorkout);

router.get('/:id', getWorkout);
app.use('/.netlify/functions/getWorkout', router);



module.exports.handler = serverlessHttp(app);