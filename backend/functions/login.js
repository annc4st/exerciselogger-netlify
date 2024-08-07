require('dotenv').config();
const express = require('express');
const serverlessHttp = require('serverless-http');
const cors = require('cors');
const connectDB = require('../utils/db')
const {loginUser } = require('../controllers/userController')


const app = express()
const router = express.Router();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

router.post('/', loginUser)
app.use('/.netlify/functions/login', router)

module.exports.handler = serverlessHttp(app);