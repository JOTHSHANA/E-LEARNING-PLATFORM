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
        name: 'Recycling',
        path: '/recycling',
        icon_path: 'RecyclingSharpIcon'
    },
    {
        name: 'Discussion Forum',
        path: '/forum',
        icon_path: 'ForumRoundedIcon'
    }
];

// Function to get the correct icon component
function getIconComponent(iconPath) {
    switch (iconPath) {
        case 'SchoolRoundedIcon':
            return <SchoolRoundedIcon className="custom-sidebar-icon" />;
        case 'RecyclingSharpIcon':
            return <RecyclingSharpIcon className="custom-sidebar-icon1" />;
        case 'ForumRoundedIcon':
            return <ForumRoundedIcon className="custom-sidebar-icon2" />;
        case 'GridViewRoundedIcon':
            return <GridViewRoundedIcon className="custom-sidebar-icon3" />;
        default:
            return null;
    }
}

function SideBar(props) {
    const [activeItem, setActiveItem] = useState("");
    const location = useLocation();
    const sidebarRef = useRef(null);

    useEffect(() => {
        const pathname = location.pathname;

        // Check if the current path is for `/subjects` or `/levels`
        if (pathname.startsWith("/levels")) {
            setActiveItem("Subjects"); // Set "Subjects" as active when the path starts with `/levels`
        } else {
            const activeItem = sidebarData.find(item => item.path === pathname);
            if (activeItem) {
                setActiveItem(activeItem.name);
            }
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

    return (
        <div ref={sidebarRef} className={props.open ? "app-sidebar sidebar-open" : "app-sidebar"}>
            <ul className="list-div">
                {sidebarData.map(item => (
                    <li
                        key={item.path}
                        className={`list-items ${location.pathname.startsWith(item.path) || (item.path === "/subjects" && location.pathname.startsWith("/levels")) ? "active" : ""}`}
                        onClick={() => { setActiveItem(item.name); props.handleSideBar(); }}
                    >
                        <Link className="link" to={item.path}>
                            {getIconComponent(item.icon_path)}
                            <p className="menu-names">{item.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="list-div">
                <div className="list-items">
                    {/* <hr style={{ borderColor: "#000000", borderWidth: "2px" }} /> */}
                    <div className="link"><ExitToAppRoundedIcon className="custom-sidebar-icon3" /> <div className="menu-names">logout</div></div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
