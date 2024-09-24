import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/appLayout/Layout";
import './CourseDetails.css';
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
// import html from '../../assets/html.png'

function CourseDetails() {
    return <Layout rId={1} body={<Body />} />;
}

function Body() {


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

    const location = useLocation(); // Access the location object
    const { courseId } = location.state || {}; // Destructure the passed state


    const fetchCourseDetails = async (courseId) => {
        try {
            const response = await requestApi("GET", `/api/courseDetails`, {
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    }

    // Check if the course data is available
    // if (courseId) {
    //     return <div>No course data available</div>;
    // } else {
    //     fetchcourseDetails();
    // }

    useEffect(() => {
        if (courseId) {
            fetchCourseDetails(courseId); // Fetch course details only if courseId exists
        }
    }, [courseId]);

    return (
        <div>
            {/* <h1>Course Details for {course.name}</h1>
            <p>Description: {course.description}</p>
            <p>Rating: {course.rating}</p>
            <p>Enrollments: {course.enrollments}</p>
            <img style={{
                width: "100%",   // Make the width 100% of the container
                height: "200px", // Set a fixed height
                objectFit: "cover" // Ensures the image covers the area without stretching
            }} src={courseImages[course.img]} alt={course.name} /> */}

        </div>
    );
}

export default CourseDetails;
