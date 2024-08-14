import { useEffect } from 'react'
import axios from 'axios'

import { useWorkoutContext } from '../hooks/useWorkoutContext'
import {useAuthContext} from '../hooks/useAuthContext'

import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'



const Home = () => {
 const { workouts, dispatch } = useWorkoutContext()
    const { user } = useAuthContext()


    useEffect(() => {
        const fetchWorkouts = async() => {
            try {
            // const response = await fetch('https://moonlit-cucurucho-e6867c.netlify.app/.netlify/functions/getWorkouts')

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getWorkouts`);

           // Check if the response status is OK (200)
        if (response.status === 200) {
            const data = response.data;
            // console.log(data); // Debugging: check what data is returned
  
            // Dispatch the data to update the workouts context
            dispatch({ type: 'SET_WORKOUTS', payload: data });
            }
            } catch (error) {
                console.log(error)
            }
        }
        fetchWorkouts();
    }, [dispatch])

    return (
        <div className='home'>
        <div className='workouts'>
            {workouts && workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
        <WorkoutForm />
        </div>
    );

}

export default Home