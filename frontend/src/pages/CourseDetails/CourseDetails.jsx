import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/appLayout/Layout";
import './CourseDetails.css'; // Import the new CSS
import Button from "../../components/Button/Button";
import html from '../../assets/html.png';
import css from '../../assets/css.png';
import js from '../../assets/js.png';
import c from '../../assets/c.png';
import cpp from '../../assets/cpp.png';
import java from '../../assets/java.png';
import python from '../../assets/python.png';
import react from '../../assets/react.png';
import Rating from '@mui/material/Rating';
import requestApi from "../../components/utils/axios";
import { getDecryptedCookie } from "../../components/utils/encrypt";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

function CourseDetails() {
    return <Layout rId={1} body={<Body />} />;
}

function Body() {
    const [course, setCourse] = useState();
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();
    const secretKey = import.meta.env.VITE_ENCRYPT_KEY;
    // Course images mapping
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

    const location = useLocation();
    const { courseId } = location.state || {};
    const { registerStatus } = location.state || {};

    const user = localStorage.getItem("D!");
    const bytes = CryptoJS.AES.decrypt(user, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const userId = decryptedData.id;
    const fetchCourseDetails = async (courseId) => {
        try {
            const response = await requestApi("GET", `/course-id?id=${courseId}`);
            setCourse(response.data);
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };


    const handleLearnClick = (courseId, c_name) => {
        console.log(courseId, c_name)
        navigate('/learning', { state: { courseId, c_name } });
    };

    const registerCourse = async (user, course) => {
        setIsRegistered(true);
        try {
            const response = await requestApi("POST", `/reg-course`, { user, course });
            if (response.success) {
                console.log('Course registered successfully:', response.data);
            } else {
                console.error('Error registering course:', response.error);
            }
        } catch (error) {
            console.error('Error in registerCourse:', error);
        }
    };


    useEffect(() => {
        if (courseId) {
            fetchCourseDetails(courseId);
        }
    }, [courseId]);

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="course-details-container">
            <div className="course-information">
                <div className="course-rating-card">
                    <span style={{ color: "var(--text)" }}>Rating: </span>
                    <span style={{ fontSize: "16px", color: "var(--text)" }}>{course.course.rating}</span><Rating value={parseFloat(course.course.rating)} readOnly precision={0.1} />
                </div>
                <p>Enrollments: {course.count || "No data available"}</p>
            </div>
            <div className="course-headers">

                <img className="course-images" src={courseImages[course.course.img]} alt={course.course.name} />
                <div>
                    <h1 style={{ color: "var(--text)" }}>{course.course.name}</h1>
                    <p style={{ color: "gray" }}>{course.course.s_description || "No description available."}</p>

                </div>
                {registerStatus === '1' ? (
                    <button onClick={() => handleLearnClick(courseId, course.course.name)} className="register-button">Continue Watching</button>
                ) : (
                    isRegistered ? (
                        <button className="register-button registered">Registered Successfully</button>
                    ) : (
                        <button onClick={() => registerCourse(userId, courseId)} className="register-button">Register Course</button>
                    )
                )}
            </div>

            <div className="course-description-card">
                <h2 style={{ color: "var(--text)" }}>About Course</h2>
                <p>{course.course.f_description}</p>
            </div>


        </div >
    );
}

export default CourseDetails;
