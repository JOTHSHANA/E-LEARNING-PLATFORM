import React, { useState, useEffect, useRef } from "react";
import "./Layout.css";
import { Link, useLocation } from "react-router-dom";
import ExploreTwoToneIcon from '@mui/icons-material/ExploreTwoTone';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import RecyclingSharpIcon from '@mui/icons-material/RecyclingSharp';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import SpeakerNotesRoundedIcon from '@mui/icons-material/SpeakerNotesRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useNavigate } from 'react-router-dom';
// Dummy JSON data for sidebar items
const sidebarData = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon_path: 'GridViewRoundedIcon'
    },
    {
        name: 'Courses',
        path: '/courses',
        icon_path: 'SchoolRoundedIcon'
    },
    {
        name: 'Practice',
        path: '/practice',
        icon_path: 'SettingsSuggestIcon'
    },
    {
        name: 'Discussion Forum',
        path: '/forum',
        icon_path: 'ForumRoundedIcon'
    },
    {
        name: 'Road Maps',
        path: '/roadmap',
        icon_path: 'AccountTreeIcon'
    }
];

// Function to get the correct icon component
function getIconComponent(iconPath) {
    switch (iconPath) {
        case 'SchoolRoundedIcon':
            return <SchoolRoundedIcon className="custom-sidebar-icon" />;
        case 'SettingsSuggestIcon':
            return <SettingsSuggestIcon sx={{ fontSize: "27px" }} className="custom-sidebar-icon1" />;
        case 'ForumRoundedIcon':
            return <ForumRoundedIcon className="custom-sidebar-icon2" />;
        case 'GridViewRoundedIcon':
            return <GridViewRoundedIcon className="custom-sidebar-icon3" />;
        case 'AccountTreeIcon':
            return <AccountTreeIcon className="custom-sidebar-icon3" />;
        default:
            return null;
    }
}

function SideBar(props) {
    const [activeItem, setActiveItem] = useState("");
    const location = useLocation();
    const sidebarRef = useRef(null);

    const navigate = useNavigate();
    useEffect(() => {
        const pathname = location.pathname;


        const activeItem = sidebarData.find(item => item.path === pathname);
        if (activeItem) {
            setActiveItem(activeItem.name);
        }
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                props.handleSideBar(); // Close the sidebar if clicked outside
            }
        };

        if (props.open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props.open]);

    const handleLogout = () => {

        navigate('/landingPage');
    };

    const roadMap = () => {
        navigate('/roadmap');
    }

    return (
        <div ref={sidebarRef} className={props.open ? "app-sidebar sidebar-open" : "app-sidebar"}>
            <ul className="list-div">
                {sidebarData.map(item => (
                    <li
                        key={item.path}
                        className={`list-items ${location.pathname.startsWith(item.path) ? "active" : ""}`}
                        onClick={() => { setActiveItem(item.name); props.handleSideBar(); }}
                    >
                        <Link className="link" to={item.path}>
                            {getIconComponent(item.icon_path)}
                            <p className="menu-names">{item.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            {/* 
            <div className="list-div" onClick={roadMap}>
                <div className="list-items">
                    <div className="link"><ExitToAppRoundedIcon className="custom-sidebar-icon3" /> <div className="menu-names" >Road Maps</div></div>
                </div>
            </div> */}

            <div className="list-div" onClick={handleLogout}>
                <div className="list-items">
                    <div className="link"><ExitToAppRoundedIcon className="custom-sidebar-icon3" /> <div className="menu-names" >logout</div></div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
