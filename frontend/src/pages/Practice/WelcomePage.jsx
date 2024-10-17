import React from 'react';
import { Button, Typography } from '@mui/material';
import './Practice.css';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

function WelcomePage({ onStart }) {
    return (
        <div className="welcome-container">
            <p className='welcome-msg'><AutoGraphIcon sx={{ color: "yellow" }} />Welcome to the Practice Session!</p>
            <p className='coder-quote'>The best way to learn to code is to code.</p>
            <button onClick={onStart} className='prblm-button'>Start Solving Problems</button>
        </div>
    );
}

export default WelcomePage;
