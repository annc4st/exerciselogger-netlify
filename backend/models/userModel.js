const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')
const validator = require('validator')


const userSchema = new Schema( {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})


//static sign up method
userSchema.statics.signup = async function (email, password) {
    if (!email || !password){
        throw Error ("Email and password fields must be filled")
    }

    // check if email is valid
    if(!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }

    // if (!validator.isStrongPassword(password)){
    //     throw Error ("Password is not strong enough")
    // }

    //check whether email is new 
    const emailExists = await this.findOne({email})
    if (emailExists) {
        throw Error("Email is already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await this.create ({email, password: hashedPassword})
    return user
}

//static login method

userSchema.statics.login = async function (email, password){
    if (!email || !password){
        throw Error ("Email and password fields must be filled")
    }

    const userExists = await this.findOne({email})
    if (!userExists) {
        throw Error ("Incorrect email")
    }

    //check password
    const matchPassword = await bcrypt.compare(password, user.password)
    if (!matchPassword){
        throw Error("Incorrect password")
    }
    return userExists
}

module.exports = mongoose.model('User', userSchema)