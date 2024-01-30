import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../constants';

const HomeScreen = () => {
    const [events, setEvents] = useState([]);
    console.log(BASE_URL)

    useEffect(() => {
        axios.get(`${BASE_URL}/api/events`).then((response) => {
            setEvents(response.data);
        }).catch((error) => {
        })
    }, [])


    return (
        events.map((event) => {
            return (
                <a href={`/events/${event._id}`} key={event._id}>
                    <h1>{event.title}</h1>
                    <h2>{event.beginningDate}</h2>
                    <p>{event.description}</p>
                </a>
            )
        })
    )
}

export default HomeScreen