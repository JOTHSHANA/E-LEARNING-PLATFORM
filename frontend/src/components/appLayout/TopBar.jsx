import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CustomizedSwitches from "./toggleTheme";


function TopBar(props) {
    return (
        <div
            className="app-topbar"
            style={{
                backgroundColor: "var(--background-1)",
                display: "flex",
                padding: "7px 7px",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
                border: "1px solid var(--border-color)",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
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
                <div className="app-name gradient-text"><b>TechLehren</b></div>
                <div className="top-bar-menus">
                    <CustomizedSwitches />
                </div>
            </div>
        </div>
    );
}

export default TopBar;
