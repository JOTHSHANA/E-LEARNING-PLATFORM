import React from 'react';
import './InputBox.css'; // Import the CSS file

const InputBox = ({ value, onChange, placeholder, type = 'text', style }) => {
  return (
    <div style={{ margin: "5px 0px" }}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="custom-input"
        style={style}
      />
    </div>
  );
};

export default InputBox;
