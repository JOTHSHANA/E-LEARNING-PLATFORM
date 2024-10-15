import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/appLayout/Layout";
import './Learning.css'; // Import the new CSS
import Button from "../../components/Button/Button";
import Rating from '@mui/material/Rating';
import Drawer from '@mui/material/Drawer';
import MenuOpenSharpIcon from '@mui/icons-material/MenuOpenSharp';
import IconButton from '@mui/material/IconButton';
import requestApi from "../../components/utils/axios";
import { getDecryptedCookie } from "../../components/utils/encrypt";

function Learning() {
    return <Layout rId={1} body={<Body />} />;
}

function Body() {
    const location = useLocation();
    // const { courseId, c_name } = location.state || "html"; // Use 'html' as default courseId
    const { courseId, c_name } = location.state || {}; // Destructure courseId and c_name
    const [open, setOpen] = useState(false);
    const userId = getDecryptedCookie("id");
    const [CourseTopics, setCourseTopics] = useState([]);
    const [activeTopic, setActiveTopic] = useState(null);
    const [topicContent, setTopicContent] = useState(null);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    // console.log(courseId, c_name)

    const fetchCourseTopics = async (courseId) => {
        try {
            const response = await requestApi("GET", `/c_topic?course=${courseId}`);
            setCourseTopics(response.data);

            // Set the first topic as active once topics are fetched
            if (response.data.length > 0) {
                setActiveTopic(response.data[0].id); // Set first topic id as active
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };

    const fetchTopicContent = async (topic, course) => {
        try {
            const response = await requestApi("GET", `/c_content?topic=${topic}&course=${course}`);
            setTopicContent(response.data);
        } catch (error) {
            console.error('Error fetching topic content:', error);
        }
    };

    const handleTopicClick = (topicId) => {
        setActiveTopic(topicId);
        fetchTopicContent(topicId, courseId); // Fetch content based on the clicked topic
    };

    useEffect(() => {
        if (courseId) {
            fetchCourseTopics(courseId);
        }
    }, [courseId]);

    useEffect(() => {
        // Fetch content only when activeTopic is set
        if (activeTopic) {
            fetchTopicContent(activeTopic, courseId);
        }
    }, [activeTopic, courseId]);

    const renderVideo = (videoEmbedCode) => {
        return (
            <div
                className="video-embed-container"
                dangerouslySetInnerHTML={{ __html: videoEmbedCode }} // Render the iframe
            />
        );
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
                    <h3>Table of contents</h3>
                    <ul>
                        {CourseTopics.length > 0 ? (
                            <ul>
                                {CourseTopics.map((topic, index) => (
                                    <li
                                        key={topic.id}
                                        className={`topic-item ${activeTopic === topic.id ? 'active' : ''}`}
                                        onClick={() => handleTopicClick(topic.id)} // Use topic.id to fetch content correctly
                                    >
                                        <h4>{`${index + 1}. ${topic.title}`}</h4>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No topics available</p>
                        )}
                    </ul>
                </div>
            </Drawer>

            <div className="learning-content">
                <div className="learning-header">
                    <h2>{c_name}</h2>
                    {/* Sidebar toggle button */}
                    <IconButton onClick={toggleDrawer} className="menu-icon">
                        <MenuOpenSharpIcon />
                    </IconButton>
                </div>
                <div className="course-content">
                    {/* <p>Welcome to the course. Here you will learn the following topics:</p>
                    <ul>
                        {CourseTopics.map((topic) => (
                            <li key={topic.id}>{topic.title}</li>
                        ))}
                    </ul> */}
                    {topicContent && topicContent.length > 0 ? (
                        <div className="topic-content">
                            {/* Loop through each topicContent item and render the details */}
                            {topicContent.map((content, index) => (
                                <div key={content.id}>
                                    {/* Render the document as HTML */}
                                    <p dangerouslySetInnerHTML={{ __html: content.document }}></p>

                                    {content.image && (
                                        <div>
                                            <h4>Image {index + 1}:</h4>
                                            <p>{content.image}</p>
                                        </div>
                                    )}

                                    {content.video && (
                                        <div style={{ marginBottom: "100px" }}>
                                            <h4>Video {index + 1}:</h4>
                                            {renderVideo(content.video)}
                                        </div>
                                    )}
                                    {/* <button>pre</button>
                                    <button>next</button> */}
                                </div>
                            ))}
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
