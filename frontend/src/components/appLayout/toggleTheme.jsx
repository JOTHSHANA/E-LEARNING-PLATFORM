import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import IconButton from '@mui/material/IconButton';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
// Define the theme
const theme = createTheme({
    palette: {
        mode: "light", // Initially set to light mode
    },
});


const lightModeProperties = {
    "--background": "#ecedf1",
    "--background-1": "#ffffff",
    "--text": "#18181b",
    "--text-1": "#353f80",
    "--text-r": "white",
    "--select": "#fbfbfb",
    "--border-color": "rgba(128, 128, 128, 0.233)",
    "--menu-hover": "#ecebf3",
    "--active-bg": "#ffffff",
    "--shadow": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    "--icons-rev": "#12c5d1",
    "--icons-bg": "#e5e3f3",
    "--card": "#c4c5cb",
    "--footer": "#eef0fe",
    "--trans": "rgba(255, 255, 255, 0.5)",
    "--lbg": "linear-gradient(120deg, #fda1a1 0%, #fbc2a1 100%)",
    "--lbg-1": "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)"

};

const darkModeProperties = {
    "--background": "#09090b",
    "--background-1": "#18181b",
    "--text": "white",
    "--text-1": "#b8b8ef",
    "--text-r": "#1f1f1f",
    "--select": "#0f1015",
    "--border-color": "rgba(128, 128, 128, 0.233)",
    "--menu-hover": "#0f1015",
    "--active-bg": "#2a2d3b",
    "--shadow": "0px 0px 0px solid black",
    "--icons-rev": "#025a63",
    "--icons-bg": "#2a2d3b",
    "--card": "#1d1f22",
    "--footer": "#eef0fe",
    "--trans": "rgba(0, 0, 0, 0.5)",
    "--lbg": "linear-gradient(to right, #434343 0%, #18181b 100%)",
    "--lbg-1": "linear-gradient(to right, #434343 0%, #18181b 100%)"
};


// Set custom properties based on theme mode
const setCustomProperties = (mode) => {
    const root = document.documentElement;
    root.style.cssText = Object.entries(
        mode === "dark" ? darkModeProperties : lightModeProperties
    )
        .map(([key, value]) => `${key}:${value};`)
        .join("");
};

// Styled switch

export default function CustomizedSwitches() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check if the user has a preference for theme stored in local storage
        const preferredTheme = localStorage.getItem("preferredTheme");
        if (preferredTheme) {
            setDarkMode(preferredTheme === "dark");
            setCustomProperties(preferredTheme);
        }
        // If not, set initial mode to light and update custom properties
        else {
            setCustomProperties("light");
        }
    }, []); // Run only on initial render

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        const mode = newMode ? "dark" : "light";
        setCustomProperties(mode); // Update custom properties based on theme mode
        localStorage.setItem("preferredTheme", mode); // Store user preference for theme
    };

    return (
        <ThemeProvider theme={theme}>
            <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
                {darkMode ? <WbSunnyIcon sx={{ color: "#6c7293" }} /> : <NightsStayIcon sx={{ color: "#6c7293" }} />}
            </IconButton>
        </ThemeProvider>
    );
}
