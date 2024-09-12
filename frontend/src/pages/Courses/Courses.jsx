// import React, { useState, useEffect } from "react";
// import Layout from "../../components/appLayout/Layout";
// import './Courses.css';
// import Button from "../../components/Button/Button";
// import CustomSelect from "../../components/Select/Select";
// import customStyles from "../../components/appLayout/selectTheme";
// import InputBox from "../../components/InputBox/InputBox";
// import html from '../../assets/html.png';
// import css from '../../assets/css.png';
// import js from '../../assets/js.png';
// import c from '../../assets/c.png';
// import cpp from '../../assets/cpp.png';
// import java from '../../assets/java.png';
// import python from '../../assets/python.png';
// import react from '../../assets/react.png';
// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';
// import axios from 'axios'
// import apiHost from "../../components/utils/api";

// function Courses() {
//     return <Layout rId={1} body={<Body />} />;
// }

// function Body() {
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const handleSelectChange = (selectedOption) => {
//         setSelectedOption(selectedOption);
//         console.log('Selected:', selectedOption);
//     };

//     const options = [
//         { value: 'option1', label: 'Option 1' },
//         { value: 'option2', label: 'Option 2' },
//         { value: 'option3', label: 'Option 3' },
//     ];

//     const [inputValue, setInputValue] = useState('');

//     const handleInputChange = (event) => {
//         setInputValue(event.target.value);
//         console.log('Input value:', event.target.value);
//     };

//     // Map of image file imports
//     const courseImages = {
//         c: c,
//         cpp: cpp,
//         java: java,
//         python: python,
//         html: html,
//         css: css,
//         js: js,
//         react: react
//     };

//     // Array of course data
//     // const courses = [
//     //     { name: "C PROGRAMMING", img: "c", description: "Learn the basics of C programming.", rating: 2.5 },
//     //     { name: "C++ PROGRAMMING", img: "cpp", description: "Learn the basics of C++ programming.", rating: 5 },
//     //     { name: "JAVA PROGRAMMING", img: "java", description: "Learn Java programming from scratch.", rating: 3.2 },
//     //     { name: "PYTHON PROGRAMMING", img: "python", description: "Master Python programming.", rating: 4.8 },
//     //     { name: "HTML", img: "html", description: "Learn the basics of HTML.", rating: 4.1 },
//     //     { name: "CSS", img: "css", description: "Learn how to style websites with CSS.", rating: 4.3 },
//     //     { name: "JAVASCRIPT", img: "js", description: "Become proficient in JavaScript.", rating: 4.6 },
//     //     { name: "REACT JS", img: "react", description: "Master front-end development with React.", rating: 4.3 }
//     // ];


//     useEffect(() => {
//         fetchCourses();
//     }, []);


//     const fetchCourses = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`${apiHost}/api/course-list`);
//             console.log(response.data)
//             setCourses(response.data);
//         } catch (error) {
//             console.error('Error fetching courses:', error);
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="courses-container">

//             {courses.map((course, index) => (
//                 <div className="course-card" key={index}>
//                     <div className="course-img-flex">
//                         <img style={{ height: "100px" }} src={courseImages[course.img]} alt={course.name} />
//                         <div style={{ padding: "10px 0px" }}>
//                             <div style={{ fontSize: "18px" }}>{course.name}</div>
//                             <Box sx={{ '& > legend': { mt: 2 } }}>
//                                 <Rating name="read-only" value={course.rating} precision={0.1} readOnly sx={{ fontSize: '18px' }} />
//                             </Box>
//                             <p style={{ fontSize: "12px", color: "gray", fontWeight: "600" }}>{course.rating}</p>
//                         </div>
//                     </div>
//                     <div className="course-description">
//                         <h4>{course.name}</h4>
//                         <p>{course.description}</p>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Courses;
