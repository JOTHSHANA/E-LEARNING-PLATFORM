
import React, { useState, useEffect } from "react";
import Layout from "../../components/appLayout/Layout";
import './Courses.css';
import Button from "../../components/Button/Button";
import CustomSelect from "../../components/Select/Select";
import customStyles from "../../components/appLayout/selectTheme";
import InputBox from "../../components/InputBox/InputBox";
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
import axios from 'axios'
import apiHost from "../../components/utils/api";
import requestApi from "../../components/utils/axios";
import { getDecryptedCookie } from "../../components/utils/encrypt";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Courses() {
    return <Layout rId={1} body={<Body />} />;
}

function Body() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [courses, setCourses] = useState([]);
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const userId = getDecryptedCookie("id");
    const navigate = useNavigate(); // For navigation

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log('Selected:', selectedOption);
    };

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        console.log('Input value:', event.target.value);
    };

    // Map of image file imports
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

    useEffect(() => {
        fetchCourses();
        fetchRegisteredCourses();
    }, []);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await requestApi("GET", `/rec-courses?user=${userId}`);
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setLoading(false);
        }
    };

    const fetchRegisteredCourses = async () => {
        console.log(userId);
        try {
            const response = await requestApi("GET", `/reg-course?user=${userId}`);
            console.log(response.data);
            setRegisteredCourses(response.data);
        } catch (error) {
            console.error('Error fetching registered courses:', error);
        }
    };

    // Function to handle course card click
    const handleCourseClick = (courseId, registerStatus) => {
        console.log(courseId, registerStatus)
        navigate('/courseDetails', { state: { courseId, registerStatus } }); // Pass the entire course object or just courseId via state
    };

    return (
        <div>
            <p style={{ margin: "0px 10px", fontWeight: "600", fontSize: "16px" }}>Registered Courses:</p>
            <div className="container-course">

                {registeredCourses.length > 0 ? (registeredCourses.map((registeredCourse, index) => (
                    <div className="course-card" onClick={() => handleCourseClick(registeredCourse.Course.id, registeredCourse.status)} key={index}>
                        <div className="course-img-style">
                            <img src={courseImages[registeredCourse.Course.img]} alt={registeredCourse.Course.name} />
                        </div>
                        <div className="course-description">
                            <div style={{ width: "100%" }}>
                                <div className="labels">
                                    <div className="label1">Live</div>
                                    <div className="label2">Free</div>
                                    <div className="label3">Public</div>
                                </div>
                                <div style={{ fontSize: "24px", fontWeight: "700" }}>{registeredCourse.Course.name}</div>
                                <p>{registeredCourse.Course.s_description}</p>

                                {/* Progress Bar */}
                                <div style={{ marginTop: "7px" }}>

                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px" }}>
                                        <b>Progress:</b>
                                        {/* <button style={{ backgroundColor: "#1572b7", border: "none", color: "white", borderRadius: "5px", cursor: "pointer", padding: "5px 10px" }}>continue learning</button> */}
                                    </div>
                                    <div style={{ width: "100%", backgroundColor: "#e0e0e0", borderRadius: "5px", overflow: "hidden" }}>
                                        <div
                                            style={{
                                                width: `${registeredCourse.progress}%`,
                                                height: "10px",
                                                backgroundColor: "#4caf50",
                                                transition: "width 0.5s",
                                            }}
                                        />
                                    </div>
                                    <p style={{ fontSize: "12px", color: "gray", fontWeight: "600" }}>{registeredCourse.progress}% Completed</p>
                                </div>
                            </div>
                            <div className="ratings" >
                                <div className="rating-box">
                                    <b>Ratings:</b>
                                    <p style={{ fontSize: "12px", color: "gray", fontWeight: "600" }}>{registeredCourse.Course.rating}</p>
                                    <Box sx={{ '& > legend': { mt: 2 } }}>
                                        <Rating name="read-only" value={Number(registeredCourse.Course.rating)} precision={0.1} readOnly sx={{ fontSize: '18px' }} />
                                    </Box>
                                </div>
                                <div className="rating-box enrolled">
                                    <b>Enrollments:</b>
                                    <p style={{ fontWeight: "700", fontSize: "20px" }}>9834</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))) : (
                    <p>No courses Registered</p>
                )}


            </div>
            <p style={{ margin: "0px 10px", fontWeight: "600", fontSize: "16px" }}>Recommanded Courses:</p>
            <div className="container-course">

                {courses.length > 0 ? (courses.map((course, index) => (

                    <div className="course-card" key={index} onClick={() => handleCourseClick(course.id, '0')}> {/* Add onClick */}
                        <div className="course-img-style">
                            <img style={{ height: "100px" }} src={courseImages[course.img]} alt={course.name} />
                        </div>
                        <div className="course-description">
                            <div>
                                <div className="labels">
                                    <div className="label1">Live</div>
                                    <div className="label2">Free</div>
                                    <div className="label3">Public</div>
                                </div>
                                <div style={{ fontSize: "24px", fontWeight: "700" }}>{course.name}</div>
                                <p>{course.s_description}</p>
                            </div>
                            <div className="ratings">
                                <div className="rating-box">
                                    <b>Ratings:</b>
                                    <p style={{ fontSize: "12px", color: "gray", fontWeight: "600" }}>{course.rating}</p>
                                    <Box sx={{ '& > legend': { mt: 2 } }}>
                                        <Rating name="read-only" value={course.rating} precision={0.1} readOnly sx={{ fontSize: '18px' }} />
                                    </Box>
                                </div>
                                <div className="rating-box enrolled">
                                    <b>Enrollments:</b>
                                    <p style={{ fontWeight: "700", fontSize: "20px" }}>32323</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))) : (
                    <p>All courses registered.</p>
                )}
            </div>
        </div>
    );
}

export default Courses;
