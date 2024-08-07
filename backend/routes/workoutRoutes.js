const express = require('express');

const {getAllWorkouts, getWorkout, addWorkout, 
    deleteWorkout, updateWorkout } = require('../controllers/workoutController');



    //const requireAuth

const router = express.Router();

// Middleware for authentication
//router.use(requireAuth);

//Routes

router.get('/', getAllWorkouts); 
router.get('/:id', getWorkout); 
router.post('/', addWorkout); 
router.delete('/:id', deleteWorkout); 
router.patch('/:id', updateWorkout); 

module.exports = router;