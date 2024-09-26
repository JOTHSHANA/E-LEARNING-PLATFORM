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

function Learning() {
    return <Layout rId={1} body={<Body />} />;
}

function Body() {
    const location = useLocation();
    const { courseId } = location.state || "html"; // Use 'html' as default courseId
    const [open, setOpen] = useState(false); // State to control drawer visibility
    const userId = getDecryptedCookie("id");
    const [CourseTopics, setCourseTopics] = useState([]);
    const [activeTopic, setActiveTopic] = useState(1); // Track the active topic
    const [topicContent, setTopicContent] = useState(null);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const fetchCourseTopics = async (courseId) => {
        try {
            const response = await requestApi("GET", `/c_topic?course=${courseId}`);
            setCourseTopics(response.data);
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };


    const fetchTopicContent = async (topicId) => {
        try {
            const response = await requestApi("GET", `/c_content?topic=${topicId}`);
            setTopicContent(response.data); // Save the fetched content
        } catch (error) {
            console.error('Error fetching topic content:', error);
        }
    };

    const handleTopicClick = (topicId) => {
        setActiveTopic(topicId); // Set the clicked topic as active
        fetchTopicContent(activeTopic); // Fetch the content for the clicked topic
    };

    useEffect(() => {
        if (courseId) {
            fetchCourseTopics(courseId);
            fetchTopicContent(activeTopic);
        }
    }, [courseId, activeTopic]);

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
                    <h3>Table of contents</h3>
                    <ul>
                        {/* Map through CourseTopics array to render each topic */}
                        {CourseTopics.map((topic, index) => (
                            <li
                                key={topic.id}
                                className={`topic-item ${activeTopic === topic.id ? 'active' : ''}`}
                                onClick={() => handleTopicClick(topic.id)} // Handle topic click
                            >
                                <h4>{`${index + 1}. ${topic.title}`}</h4>
                            </li>
                        ))}

                    </ul>
                </div>
            </Drawer>

            <div className="learning-content">
                <div className="learning-header">
                    <h2>Course Details</h2>
                    {/* Sidebar toggle button */}
                    <IconButton onClick={toggleDrawer} className="menu-icon">
                        <MenuIcon />
                    </IconButton>
                </div>
                <div className="course-content">
                    {/* <p>Welcome to the course. Here you will learn the following topics:</p>
                    <ul>
                        {CourseTopics.map((topic) => (
                            <li key={topic.id}>{topic.title}</li>
                        ))}
                    </ul> */}

                    {topicContent ? (
                        <div className="topic-content">
                            <p dangerouslySetInnerHTML={{ __html: topicContent[0].document }}></p>
                            {topicContent[0].image && (
                                <div>
                                    <h4>Image:</h4>
                                    <p>{topicContent[0].image}</p>
                                </div>
                            )}
                            {topicContent[0].video && (
                                <div>
                                    <h4>Video:</h4>
                                    <p>{topicContent[0].video}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>Select a topic to view its content.</p> // Placeholder when no topic is selected
                    )}
                </div>
            </div>
        </div>
    );
}

export default Learning;
