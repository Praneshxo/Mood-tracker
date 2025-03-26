import React, { useState } from 'react';
import LoginPage from './LoginPage.jsx';
import MoodLogPage from './MoodLogPage.jsx';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    return (
        <div>
            {!token ? (
                <LoginPage setToken={setToken} />
            ) : (
                <MoodLogPage token={token} />
            )}
        </div>
    );
};

export default App;
