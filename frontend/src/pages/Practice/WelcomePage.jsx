import React from 'react';
import { Button, Typography } from '@mui/material';
import './Practice.css';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

function WelcomePage({ onStart, onStartSQL }) {
    return (
        <div className='lang-and-sql-welcome'>
            <div className="welcome-container">
                <p className='welcome-msg'><AutoGraphIcon sx={{ color: "yellow" }} />Practice<b>Programming Languages</b></p>
                <p className='coder-quote'>The best way to learn to code is to code.</p>
                <button onClick={onStart} className='prblm-button'>Start Solving Problems</button>
            </div>
            <div className="welcome-containers">
                <p className='welcome-msg'><AutoGraphIcon sx={{ color: "yellow" }} />Practice<b>SQL</b></p>
                <p className='coder-quote'>Master the art of database management, one query at a time.</p>
                <button onClick={onStartSQL} className='prblm-button'>Start Solving SQL Queries</button>
            </div>
        </div>

    );
}

export default WelcomePage;
