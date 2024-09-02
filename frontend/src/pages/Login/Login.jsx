import React, { useState } from 'react';
import './Login.css';

function LoginSignup() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            <div className={`login-signup-container ${isLogin ? '' : 'signup-mode'}`}>
                <div className="login-signup-box">
                    <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                    <form>
                        {!isLogin && (
                            <div className="input-group">
                                <label htmlFor="name">Name *</label>
                                <input type="text" id="name" name="name" required />
                            </div>
                        )}
                        <div className="input-group">
                            <label htmlFor="username">{isLogin ? 'Username or email *' : 'Username *'}</label>
                            <input type="text" id="username" name="username" required />
                        </div>
                        {!isLogin && (
                            <div className="input-group">
                                <label htmlFor="email">Email *</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                        )}
                        <div className="input-group">
                            <label htmlFor="password">Password *</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        {!isLogin && (
                            <div className="input-group">
                                <label htmlFor="confirmPassword">Confirm Password *</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" required />
                            </div>
                        )}
                        {isLogin && (
                            <div className="options">
                                <div className="remember-me">
                                    <input type="checkbox" id="remember" name="remember" />
                                    <label htmlFor="remember">Remember me</label>
                                </div>
                                <a href="/dashboard" className="forgot-password">
                                    Forgot password
                                </a>
                            </div>
                        )}
                        <button type="submit" className="login-signup-button">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                        {isLogin && (
                            <div className="social-login">
                                <button className="facebook-button">Facebook</button>
                                <button className="google-button">Google plus</button>
                            </div>
                        )}
                    </form>
                    <div className="toggle-link">
                        {isLogin ? (
                            <>
                                Don't have an Account?{' '}
                                <a onClick={toggleForm}>
                                    Sign Up
                                </a>
                            </>
                        ) : (
                            <>
                                Already have an Account?{' '}
                                <a onClick={toggleForm}>
                                    Login
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;
