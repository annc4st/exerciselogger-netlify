import { useEffect, useState } from 'react'
import axios from 'axios'
import WorkoutDetails from '../components/WorkoutDetails'



const Home = () => {
    const [workouts, setWorkouts] = useState([]);


    useEffect(() => {
        const fetchWorkouts = async() => {
            try {
            // const response = await fetch('https://moonlit-cucurucho-e6867c.netlify.app/.netlify/functions/getWorkouts')

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getWorkouts`);

            // console.log(response)
            // const data = await response.json(); for fetch
            const data = response.data
            console.log(data);
            setWorkouts(data) // Handle the data as needed
            } catch (error) {
                console.log(error)
            }
        }
        fetchWorkouts();
    }, [])

    return (
        <div className='home'>
        <div className='workouts'>
            {workouts && workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
        </div>
    );

}

export default Home