import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../constants'

const EventScreen = () => {
    const { id: eventId } = useParams();

    const [event, setEvent] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [college, setCollege] = useState('');
    const [faculty, setFaculty] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        axios.get(`${BASE_URL}/api/events/${eventId}`).then((response) => {
            const { data } = response;
            setEvent(data);
        }).catch((err) => {
            return <div>
                <h1>Event not found</h1>
                <Link to='/'>Back to Home</Link>
            </div>
        });
    }, [eventId]);

    if (!event) {
        return <div>Loading...</div>
    }

    const currentDate = new Date();
    const beginningDate = new Date(event.beginningDate);

    const handleRegisterClick = () => {
        setShowForm(!showForm);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name, college, faculty, email, phone, event: eventId };
        axios.post(`${BASE_URL}/api/participants`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            alert('Registration successful');
            setShowForm(false);
        }).catch((err) => {
            alert('Registration failed');
        });
    }

    return (
        <div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>{event.beginningDate}</p>
            <p>{event.endingDate}</p>
            <p>{event.venue}</p>
            <p>{event.coordinator}</p>
            <p>{event.subcoordinator}</p>
            {currentDate < beginningDate && (
                <button onClick={handleRegisterClick}>{showForm ? "Close" : "Register"}</button>
            )}
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="text" placeholder="College" value={college} onChange={(e) => setCollege(e.target.value)} required />
                    <input type="text" placeholder="Faculty" value={faculty} onChange={(e) => setFaculty(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} pattern="[0-9]{10}" />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    )
}

export default EventScreen