import { formatDistanceToNow } from 'date-fns'
import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutContext";


const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();

  const handleClick = async() => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/deleteWorkout/${workout._id}`
      )
      const jsonResponse = response.data; //the doc we just deleted from db
      console.log(jsonResponse);

      if (response.ok) {
        dispatch({type: 'DELETE_WORKOUT', payload: jsonResponse})
      }

    } catch (error){
      console.log("Error deleting ", error)
    }

  }

    return (
        <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Number of reps: </strong>{workout.reps}</p>
        <p>{formatDistanceToNow (new Date(workout.createdAt), {addSuffix: true})}</p>
        <span className ="material-symbols-outlined" onClick={handleClick}>delete</span>
      </div>
    )
}

export default WorkoutDetails