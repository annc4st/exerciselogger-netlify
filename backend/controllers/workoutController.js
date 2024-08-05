const WorkoutModel = require('../models/workoutModel')
const mongoose = require('mongoose')


//all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await WorkoutModel.find().sort({created: -1})
    res.status(200).json(workouts)
}


module.exports = {
    getAllWorkouts
  };