import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/appLayout/Layout";
import './Learning.css'; // Import the new CSS
import Button from "../../components/Button/Button";
import Rating from '@mui/material/Rating';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import requestApi from "../../components/utils/axios";
import { getDecryptedCookie } from "../../components/utils/encrypt";

// Dummy data simulating backend response
const courseData = {
    html: {
        name: "HTML Course",
        topics: [
            "Introduction to HTML",
            "HTML Tags",
            "HTML Forms",
            "HTML Media",
            "HTML APIs",
        ],
    },
    css: {
        name: "CSS Course",
        topics: [
            "Introduction to CSS",
            "CSS Selectors",
            "Box Model",
            "Flexbox and Grid",
            "CSS Animations",
        ],
    },
    js: {
        name: "JavaScript Course",
        topics: [
            "Introduction to JavaScript",
            "DOM Manipulation",
            "ES6+ Features",
            "Asynchronous JS",
            "APIs and AJAX",
        ],
    },
    // Add more course data as needed
};

function Learning() {
    return <Layout rId={1} body={<Body />} />;
}

function Body() {
    const location = useLocation();
    const { courseId } = location.state || "html"; // Use 'html' as default courseId
    const [open, setOpen] = useState(false); // State to control drawer visibility
    const userId = getDecryptedCookie("id");

    // Fetch course data based on courseId (using dummy data here)
    const course = courseData[courseId] || {};

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div className="learning-page-container">
            {/* Sidebar drawer */}
            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer}
                className="learning-sidebar"
            >
                <div className="sidebar-content">
                    <h3>{course.name} Topics</h3>
                    <ul>
                        {course.topics && course.topics.map((topic, index) => (
                            <li key={index}>{topic}</li>
                        ))}
                    </ul>
                </div>
            </Drawer>

            {/* Main content area */}
            <div className="learning-content">
                <div className="learning-header">
                    <h2>{course.name}</h2>
                    {/* Sidebar toggle button */}
                    <IconButton onClick={toggleDrawer} className="menu-icon">
                        <MenuIcon />
                    </IconButton>
                </div>
                <div className="course-content">
                    {/* You can add more detailed content here */}
                    <p>Welcome to the {course.name}. Here you will learn the following topics:</p>
                    <ul>
                        {course.topics && course.topics.map((topic, index) => (
                            <li key={index}>{topic}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Learning;
