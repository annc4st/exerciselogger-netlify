const express = require('express');
const serverlessHttp = require('serverless-http');
const mongoose = require('mongoose');

const { getAllWorkouts } = require ('../controllers/workoutController')
const connectDB = require('../utils/db')


const app = express()

app.use(express.json());

connectDB();

app.get('/.netlify/functions/workouts', getAllWorkouts);

const handler = serverlessHttp(app)

module.exports.handler = async( event, context) => {
    const result = await handler (event, context);
    return result
}