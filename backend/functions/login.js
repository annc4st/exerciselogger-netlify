require('dotenv').config();
const express = require('express');
const serverlessHttp = require('serverless-http');
const cors = require('cors');
const connectDB = require('../utils/db')
const {loginUser } = require('../controllers/userController')


const app = express()
const router = express.Router();

// Middleware
// Middleware
app.use(cors({
  origin: 'https://gymswimworkouts.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
}));
app.use(express.json());

connectDB();

router.post('/', loginUser)
app.use('/.netlify/functions/login', router)

module.exports.handler = serverlessHttp(app);