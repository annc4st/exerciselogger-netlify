const UserModel = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id }, process.env.SECRET, {expiresIn: '3h'})
}

//login

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const loggedUser = await UserModel.login(email, password)
        const token = createToken(loggedUser._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup
const signupUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const signedupUser = await UserModel.signup(email, password)
        const token = createToken(signedupUser._id)
        res.status(200).json({email, token})
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, signupUser }