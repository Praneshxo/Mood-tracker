import React, { useState } from 'react';

const MoodLogPage = () => {
    const [date, setDate] = useState('');
    const [mood, setMood] = useState('');
    const [event, setEvent] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const token = localStorage.getItem('token');  // Get token from localStorage

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/api/mood-logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, mood, event, token }),
        });

        const data = await response.json();
        if (response.ok) {
            setMessage('Mood log saved successfully!');
        } else {
            setError(data.message);
        }
    };

    return (
        <div>
            <h1>Log Your Mood</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Mood"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Describe the event"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    required
                />
                <button type="submit">Save Mood</button>
            </form>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
        </div>
    );
};

export default MoodLogPage;
