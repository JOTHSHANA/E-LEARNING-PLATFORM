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


// const courseData = [
//     { id: 1, name: 'Course 1', image: course, description: 'learn c language for free' },
//     { id: 2, name: 'Course 2', image: course, description: 'learn c language for free' },
//     { id: 3, name: 'Course 3', image: course, description: 'learn c language for free' },
//     { id: 4, name: 'Course 4', image: course, description: 'learn c language for free' },
//     { id: 5, name: 'Course 5', image: course, description: 'learn c language for free' },
//     { id: 6, name: 'Course 6', image: course, description: 'learn c language for free' },
// ];

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
            console.log(response.data)
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
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
                        <div className="course-cards" key={index}>
                            <div className="course-img-flex">
                                <img style={{
                                    width: "100%",   // Make the width 100% of the container
                                    height: "200px", // Set a fixed height
                                    objectFit: "cover" // Ensures the image covers the area without stretching
                                }} src={courseImages[course.img]} alt={course.name} />
                                <div style={{ padding: "10px 0px", display: "flex", flexDirection: "column" }}>
                                    <div style={{ fontSize: "24px", fontWeight: "700" }}>{course.name}</div>
                                    <Box sx={{ '& > legend': { mt: 2 } }}>
                                        <Rating name="read-only" value={course.rating} precision={0.1} readOnly sx={{ fontSize: '18px' }} />
                                    </Box>
                                    <p style={{ fontSize: "12px", color: "gray", fontWeight: "600" }}>{course.rating}</p>
                                </div>
                            </div>
                            <div className="course-description">
                                <p>{course.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Course;
