import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import CryptoJS from "crypto-js";
import "./Login.css";
import InputBox from "../../components/InputBox/InputBox";
import FacebookIcon from "@mui/icons-material/Facebook";
import loginImage from "../../assets/loginImage.jpg";
import toast from "react-hot-toast";
import { setEncryptedCookie, decryptData } from "../../components/utils/encrypt";
import requestApi from "../../components/utils/axios";
import axios from "axios";

export default function LoginPopup({ open, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Fill up all the fields.");
      return;
    }
    try {
      const response = await requestApi("POST", "/login", { username, password });
      const { message, user, token } = response.data;

      if (message === "Login successful") {
        setEncryptedCookie("token", token);
        setEncryptedCookie("name", user.name);
        setEncryptedCookie("email", user.email);
        setEncryptedCookie("id", user.id);

        localStorage.setItem("token", token);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("id", user.id);

        navigate("/dashboard");
        toast.success("Login successful!");
        onClose();
      } else {
        toast.error("Username or Password is wrong.");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const tokenId = credentialResponse.credential;
    // console.log(tokenId)
    const secretKey = import.meta.env.VITE_ENCRYPT_KEY;
  
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_HOST}/auth/google/callback`,
        {}, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );
  
      if (res.status === 200) {
        const { d } = res.data;
  
        localStorage.setItem("D!", d);
  
        const bytes = CryptoJS.AES.decrypt(d, secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  
        console.log(decryptedData.name);
        navigate('/dashboard')
      } else {
        console.error("Login failed:", res.statusText);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };
  
  const handleGoogleError = () => {
    toast.error("Google Sign-In was unsuccessful. Please try again.");
  };
  
  if (!open) return null;

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <div className="login-modal-content">
          <div
            className="login-image-wrapper"
            style={{ position: "relative", width: "200px" }}
          >
            <div
              className="overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "var(--trans)",
                zIndex: 1,
              }}
            ></div>
            <img
              style={{ width: "100%", display: "block" }}
              src={loginImage}
              alt="Login"
            />
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
              <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                />
              </GoogleOAuthProvider>
              <button className="facebook-login">
                <FacebookIcon /> Sign in with Facebook
              </button>
            </div>
          </div>
        </div>

        <button
          className="close-button"
          style={{ color: "var(--text)" }}
          onClick={onClose}
        >
          <b>X</b>
        </button>
      </div>
    </div>
  );
}
