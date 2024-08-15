require('dotenv').config();
const express = require('express');
const serverlessHttp = require('serverless-http');
const cors = require('cors');
const connectDB = require('../utils/db')
const {signupUser } = require('../controllers/userController')


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

router.post('/', signupUser)
app.use('/.netlify/functions/signup', router)

module.exports.handler = serverlessHttp(app);