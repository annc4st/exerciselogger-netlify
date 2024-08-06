const express = require('express');
const serverlessHttp = require('serverless-http');
const { getWorkout } = require('../controllers/workoutController');
const connectDB = require('../utils/db');
const cors = require('cors');


const app = express();
const router = express.Router();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

//Routes
app.get('/.netlify/functions/getWorkout/:id', getWorkout);

// Route to get a single workout by ID
router.get('/:id', getWorkout);


module.exports = router;

module.exports.handler = serverlessHttp(app);