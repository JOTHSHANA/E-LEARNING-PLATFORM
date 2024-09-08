import React from 'react';
import './Button.css'; // Import the CSS file

const Button = ({ color, backgroundColor, text, onClick }) => {
    const buttonStyle = {
        color: color,
        backgroundColor: backgroundColor,
    };

    return (
        <button className="custom-button" style={buttonStyle} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
