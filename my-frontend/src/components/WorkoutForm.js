import { useState } from "react";
import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    if (!user) {
      setError("You must be logged in!");
      return;
    }

    //  const response = await fetch(`${process.env.REACT_APP_API_URL}/createWorkout/`, {
    //     method: 'POST',
    //     body: JSON.stringify(workout),
    //     headers: {
    //         'Content-type': 'application/json',
    //                 'Authorization': `Bearer ${user.token}`
    //     }
    //   })
    //     const jsonResponse = await response.json()    
    //   console.log(jsonResponse);

    //     if (!response.ok) {
    //       setError(jsonResponse.error)
    //     }

    //     if (response.ok) {
    //       setError(null)
    //       setTitle('')
    //       setLoad('')
    //       setReps('')
    //       dispatch({type: 'CREATE_WORKOUT', payload: jsonResponse})
    //     }



    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/createWorkout/`,
        workout,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    
      const jsonResponse = response.data;
    
      console.log(jsonResponse);
    
      if (response.status !== 200) {
        setError(jsonResponse.error);
      } else {
        setError(null);
        setTitle('');
        setLoad('');
        setReps('');
        dispatch({ type: 'CREATE_WORKOUT', payload: jsonResponse });
      }
    } catch (error) {
      // Handle errors
      setError(error.response ? error.response.data.error : 'Something went wrong');
    }
    
  };

  

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add new workout</h3>
      <label>Exercise title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Load (in kg)</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label>Reps</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
