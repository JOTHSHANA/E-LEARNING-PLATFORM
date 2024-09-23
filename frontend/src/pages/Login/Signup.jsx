import React, { useState } from 'react';
import './Login.css'; // CSS file for SignUp page
import InputBox from '../../components/InputBox/InputBox'; // Adjust the path as necessary
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import loginImage from '../../assets/loginImage.jpg'

export default function SignUpPopup({ open, onClose }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };

    if (!open) return null;

    return (
        <div className="signup-overlay">
            <div className="signup-modal">
                <div className="signup-modal-content">
                    <div className="login-image-wrapper" style={{ position: "relative", width: "220px" }}>
                        <div className="overlay" style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "var(--trans)", // Semi-transparent black
                            zIndex: 1,
                        }}></div>
                        <img style={{ width: "100%", display: "block" }} src={loginImage} alt="Login" />
                    </div>

                    <div className="login-form">
                        <h2>Sign Up</h2>

                        <div className="input-field">
                            <label>Name</label>
                            <InputBox
                                value={name}
                                onChange={(e) => handleInputChange(e, setName)}
                                placeholder="Name"
                            />
                        </div>

                        <div className="input-field">
                            <label>Username</label>
                            <InputBox
                                value={username}
                                onChange={(e) => handleInputChange(e, setUsername)}
                                placeholder="Username"
                            />
                        </div>

                        <div className="input-field">
                            <label>Email</label>
                            <InputBox
                                value={email}
                                onChange={(e) => handleInputChange(e, setEmail)}
                                placeholder="Email"
                            />
                        </div>

                        <div className="input-field">
                            <label>Password</label>
                            <InputBox
                                value={password}
                                onChange={(e) => handleInputChange(e, setPassword)}
                                placeholder="Password"
                                type="password"
                            />
                        </div>

                        <div className="input-field">
                            <label>Confirm Password</label>
                            <InputBox
                                value={confirmPassword}
                                onChange={(e) => handleInputChange(e, setConfirmPassword)}
                                placeholder="Confirm Password"
                                type="password"
                            />
                        </div>

                        <button className="signup-button">Sign Up</button>

                        <div className="social-signup">
                            <button className="google-signup">
                                <GoogleIcon /> Sign up with Google
                            </button>
                            <button className="facebook-signup">
                                <FacebookIcon /> Sign up with Facebook
                            </button>
                        </div>
                    </div>
                </div>
                <button className="close-button" style={{ color: "var(--text)" }} onClick={onClose}><b>X</b></button>
            </div>
        </div>
    );
}
