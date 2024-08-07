const express = require('express')
const userRouter = express.Router();

const { loginUser, signupUser } = require ('../controllers/userController')

userRouter.post('/login', loginUser)
userRouter.post('/signup', signupUser)


module.exports = userRouter