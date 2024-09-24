// course.js

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './course.css';
import requestApi from '../../components/utils/axios';
import html from '../../assets/html.png';
import css from '../../assets/css.png';
import js from '../../assets/js.png';
import c from '../../assets/c.png';
import cpp from '../../assets/cpp.png';
import java from '../../assets/java.png';
import python from '../../assets/python.png';
import react from '../../assets/react.png';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import AlarmIcon from '@mui/icons-material/Alarm';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const Course = React.forwardRef((props, ref) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const courseImages = {
        c: c,
        cpp: cpp,
        java: java,
        python: python,
        html: html,
        css: css,
        js: js,
        react: react
    };

    const handleCardClick = (courseId) => {
        if (courseId === 2) {
            navigate('/react-details');
        }
    };

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await requestApi("GET", `/course-list`);
            console.log(response.data);
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <section ref={ref} id="courses">
            <div className='total-course'>
                <div className="avail-courses">
                    {courses.map((course, index) => (
                        <div className="course-cards" key={index} onClick={() => handleCardClick(course.id)}>
                            <div className="course-img-flex">
                                <img src={courseImages[course.img]} alt={course.name} className="course-img" />
                                <div className="course-details">
                                    <div className="course-header">
                                        <div className="course-info">
                                            <PhonelinkIcon className="course-icon" />
                                            {course.name}
                                        </div>
                                        <div className="course-type">Technology</div>
                                    </div>
                                    <p className="c-description">{course.description}</p>
                                    <div className="timing-info">
                                        <div className="total-time info-time"><AlarmIcon sx={{ color: "#778af5" }} />08 hr 15 mins</div>
                                        <div className="lectures info-time"><LibraryBooksIcon sx={{ color: "#778af5" }} />30 lectures</div>
                                    </div>
                                    <div className="price-ratings">
                                        <div className="price">FREE</div>
                                        <div className="ratings">
                                            <Box sx={{display:"flex", alignItems:"center", gap:"10px"}}>
                                                {course.rating}
                                                <Rating name="read-only" value={course.rating} precision={0.1} readOnly />
                                            </Box>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Course;
