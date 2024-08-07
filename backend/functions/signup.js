require('dotenv').config();
const express = require('express');
const serverlessHttp = require('serverless-http');
const cors = require('cors');
const connectDB = require('../utils/db')
const {signupUser } = require('../controllers/userController')


const app = express()
const router = express.Router();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

router.post('/', signupUser)
app.use('/.netlify/functions/signup', router)

module.exports.handler = serverlessHttp(app);