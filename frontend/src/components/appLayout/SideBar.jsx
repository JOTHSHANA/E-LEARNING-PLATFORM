import React, { useState } from "react";
import "./Layout.css";
import { Link } from "react-router-dom";
import ExploreTwoToneIcon from '@mui/icons-material/ExploreTwoTone';


function SideBar(props) {

    return (
        <div
            className={props.open ? "app-sidebar sidebar-open" : "app-sidebar"}
        >
            <ul className="list-div">
                <li
                    className="list-item"
                >
                    <Link className="link" to='/dashboard'>
                        <ExploreTwoToneIcon />
                        <p className="menu-names">Dashboard</p>
                    </Link>
                </li>
                <li
                    className="list-item"
                >
                    <Link className="link" to="/login">
                        <ExploreTwoToneIcon />
                        <p className="menu-names">Login</p>
                    </Link>
                </li>
                <li
                    className="list-item"
                >
                    <Link className="link" >
                        <ExploreTwoToneIcon />
                        <p className="menu-names">Dashboard</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;
