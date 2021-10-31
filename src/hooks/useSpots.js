import { useEffect, useState } from "react"
import axios from 'axios'

const useSpots = () => {
    const [spots, setSpots] = useState([])

    useEffect(()=>{
        axios.get('https://dreadful-corpse-01416.herokuapp.com/spots')
        .then(res => setSpots(res.data))
    },[])

    return {spots, setSpots}
}

export default useSpots