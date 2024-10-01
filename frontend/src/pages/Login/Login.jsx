import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import InputBox from '../../components/InputBox/InputBox';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import requestApi from '../../components/utils/axios';
import { setEncryptedCookie } from '../../components/utils/encrypt';
import loginImage from '../../assets/loginImage.jpg'
import toast from 'react-hot-toast';

export default function LoginPopup({ open, onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleLogin = async () => {
        if (!username || !password) {
            toast.error('Fill up all the fields.');
            return;
        }
        try {
            const response = await requestApi("POST", '/login', {
                username,
                password,
            });

            const { message, user, token } = response.data;

            if (message === 'Login successful') {
                setEncryptedCookie('token', token);
                setEncryptedCookie('name', user.name);
                setEncryptedCookie('email', user.email);
                setEncryptedCookie('id', user.id);


                navigate('/dashboard');
                toast.success("login successful!")
                onClose();
            } else {
                console.error('Username or Password is wrong.', message);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };


    if (!open) return null;

    return (
        <div className="login-overlay">
            <div className="login-modal">
                <div className="login-modal-content">
                    <div className="login-image-wrapper" style={{ position: "relative", width: "200px" }}>
                        <div className="overlay" style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "var(--trans)", // Semi-transparent black
                            zIndex: 1
                        }}></div>
                        <img style={{ width: "100%", display: "block" }} src={loginImage} alt="Login" />
                    </div>


                    <div className="login-form">
                        <h2>Login</h2>
                        <div className="input-field">
                            <label>Username</label>
                            <InputBox
                                value={username}
                                onChange={(e) => handleInputChange(e, setUsername)}
                                placeholder="Username"
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

                        <div className="remember-me">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label>Remember me</label>
                        </div>

                        <button className="login-button" onClick={handleLogin}>
                            Login
                        </button>

                        <div className="social-login">
                            <button className="google-login">
                                <GoogleIcon /> Sign in with Google
                            </button>
                            <button className="facebook-login">
                                <FacebookIcon /> Sign in with Facebook
                            </button>
                        </div>
                    </div>
                </div>

                <button className="close-button" style={{ color: "var(--text)" }} onClick={onClose}><b>X</b></button>
            </div>
        </div>
    );
}
