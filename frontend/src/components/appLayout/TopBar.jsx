import React, { useState, useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CustomizedSwitches from "./toggleTheme";
import Button from "../Button/Button";
import LoginDialog from "../../pages/Login/Login";
import SignupDialog from "../../pages/Login/Signup";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';


function TopBar(props) {
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);

    const handleLoginOpen = () => setOpenLogin(true);
    const handleLoginClose = () => setOpenLogin(false);

    const handleSignupOpen = () => setOpenSignup(true);
    const handleSignupClose = () => setOpenSignup(false);
    return (
        <div
            className="app-topbar"
            style={{
                backgroundColor: "var(--background)",
                display: "flex",
                padding: "7px 7px",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "2px solid var(--border-color)",
                gap: 20,
                // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }}
            >
                <div onClick={props.sidebar} className="sidebar-menu">
                    <MenuIcon />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <MilitaryTechIcon sx={{ fontSize: "35px" }} className="techLehren-icon" />
                    <div style={{ lineHeight: "18px" }}>

                        <b className="app-name gradient-text">TechLehren</b>
                        <br />
                        <p style={{ fontSize: "12px", fontWeight: "700", color: "gray" }}>&nbsp;Limitless learning</p>
                    </div>
                </div>

                <div className="top-bar-menus">
                    <CustomizedSwitches />
                    <Button
                        color="#fff"
                        backgroundColor="#5c89aa"
                        text="Log In"
                        onClick={handleLoginOpen}
                    />
                    <Button
                        color="#fff"
                        backgroundColor="#007bff"
                        text="Sign Up"
                        onClick={handleSignupOpen}
                    />
                </div>
            </div>
            {/* Dialogs */}
            <LoginDialog open={openLogin} onClose={handleLoginClose} />
            <SignupDialog open={openSignup} onClose={handleSignupClose} />
        </div>
    );
}

export default TopBar;
