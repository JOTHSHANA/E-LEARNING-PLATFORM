import React, { useState } from 'react';
import './Login.css'; // CSS file for SignUp page
import InputBox from '../../components/InputBox/InputBox'; // Adjust the path as necessary
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import loginImage from '../../assets/loginImage.jpg';
import requestApi from '../../components/utils/axios';
import toast from 'react-hot-toast';  // Import react-hot-toast
import { useNavigate } from 'react-router-dom';


export default function SignUpPopup({ open, onClose }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();


    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleSignUp = async () => {

        if (!name || !username || !email || !password || !confirmPassword) {
            toast.error('Fill up all the fields.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error(`passwords doesn't match`);
            return;
        }
        const payload = {
            email,
            username,
            password,
            name,
        };

        console.log('Payload being sent:', payload);

        try {
            const response = await requestApi("POST", "/add-user", payload);

            if (response.success) {
                const { message, user } = response.data;

                // Log the success response
                console.log("Sign-up successful:", message, user);
                navigate('/dashboard');
                toast.success(`Welcome ${user.name}! Account created successfully.`);
            } else {
                // Log the error response
                console.error("Sign-up failed:", response.error);

                // Show an error toast with the backend error message
                toast.error(response.error || "Sign-up failed. Please try again.");
            }
        } catch (error) {
            // Log the error
            console.error("Error during sign-up:", error.message);

            // Show an error toast
            toast.error("Something went wrong. Please try again.");
        }
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

                        <button className="signup-button" onClick={handleSignUp}>Sign Up</button>

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
