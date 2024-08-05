const express = require('express');
const serverlessHttp = require('serverless-http');

const { getAllWorkouts } = require ('../controllers/workoutController')
const connectDB = require('../utils/db')


const app = express()

connectDB();

app.get('/.netlify/functions/getWorkouts', getAllWorkouts);

const handler = serverlessHttp(app)

module.exports.handler = async( event, context) => {
    const result = await handler (event, context);
    return result
}