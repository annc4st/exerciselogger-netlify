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

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/createWorkout/`,
        workout,
        { headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          }
        }
      );
   
    
      const jsonResponse = response.data;
      console.log("Response data: ", jsonResponse);
    
      if (response.status !== 200) {
        setError(jsonResponse.error);
        setEmptyFields(jsonResponse.emptyFields || []);
        console.log("empty fields after error: ", emptyFields); 
        
      } else {
        setEmptyFields([])
        setError(null);
        setTitle('');
        setLoad('');
        setReps('');
      
        dispatch({ type: 'CREATE_WORKOUT', payload: jsonResponse });
      }
    } catch (error) {
      console.error("Error during submission:", error);
      console.log("Server response:", error.response?.data); // Log the server's response message
      setError(error.response?.data.error || "An error occurred");
      setEmptyFields(error.response?.data.emptyFields || []);
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
        className={emptyFields.includes('title') ? 'errorInput' : 'inputOk'}
        />
      <label>Load (in kg)</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'errorInput' : 'inputOk'}
      />
      <label>Reps</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'errorInput' : 'inputOk'}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
