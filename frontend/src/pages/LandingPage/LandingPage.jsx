import React, { useState } from "react";
import Layout from "../../components/appLayout/Layout";
import './LandingPage.css';
import Button from "../../components/Button/Button";
import CustomSelect from "../../components/Select/Select";
import customStyles from "../../components/appLayout/selectTheme";
import InputBox from "../../components/InputBox/InputBox";
import TopBar from "../../components/appLayout/TopBar";
import study from '../../assets/study.png'
import give from '../../assets/give.png'
import take from '../../assets/take.png'
import react from '../../assets/react.png';
import html from '../../assets/html.png';
import css from '../../assets/css.png';
import js from '../../assets/js.png';
import c from '../../assets/c.png';
import cpp from '../../assets/cpp.png';
import java from '../../assets/java.png';
import python from '../../assets/python.png';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';




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

const courses = [
    { name: "C PROGRAMMING", image: "c" },
    { name: "C++ PROGRAMMING", image: "cpp" },
    { name: "JAVA PROGRAMMING", image: "java" },
    { name: "PYTHON PROGRAMMING", image: "python" },
    { name: "HTML", image: "html" },
    { name: "CSS", image: "css" },
    { name: "JAVASCRIPT", image: "js" },
    { name: "REACT JS", image: "react" }
];

function LandingPage() {
    return <Body />;
}

function Body() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleClick = () => {

    }

    const [selectedOption, setSelectedOption] = useState(null);

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
    const handleNameChange = (event) => {
        setName(event.target.value);
        console.log(name);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    return (
        <div className="landing-page">
            <div style={{ position: "sticky", top: "0px", zIndex: "10" }}>
                <TopBar />
            </div>
            <div className="landing-body">
                <div className="intro-div">
                    <div className="about-div">
                        <div className="quote-image">
                            <div className="quote">
                                <h1 className="TechLehren">TechLehren</h1>
                                <p style={{ fontSize: "18px", fontWeight: "600" }}>Learn Beyond Boundaries, gain knowledge Without Limits!</p>
                                <p>Signup and enjoy learning...</p>
                            </div>
                            <div className="learning-image">
                                <img style={{ height: "240px", borderRadius: "5px" }} src={study} alt="learning" />
                            </div>
                        </div>
                        <div className="features">
                            <div className="give">

                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <p style={{ fontSize: "18px", fontWeight: "600", whiteSpace: "nowrap" }}>Key features that we provide:</p>
                                    <hr style={{ width: "100%" }} />
                                    <div style={{ display: "flex" }}>

                                        <ul style={{ padding: "0px 0px 0px 20px", margin: "10px 0px 10px 0px" }}>
                                            <li>Availability of both videos and documents.</li>
                                            <li>Discussion forum for clarification of doubts.</li>
                                            <li>Integrated compilers with questions and testcases.</li>
                                            <li>Can track your productivity and provide badges.</li>
                                            <li>User friendly interface.</li>

                                        </ul>
                                        <img style={{ height: "210px", position: "relative", top: "30px", right: "-35px" }} src={give} alt="" />
                                    </div>

                                </div>
                            </div>
                            <div className="take">
                                <p style={{ fontSize: "18px", fontWeight: "600" }}>Advantages:</p>
                                <hr style={{ width: "100%" }} />
                                <div style={{ display: "flex" }}>
                                    <img style={{ height: "200px", position: "relative", top: "40px", left: "-35px" }} src={take} alt="" />
                                    <div>
                                        <ul style={{ padding: "10px", margin: "10px 0px 10px 0px" }}>
                                            <li>All type of resourses at one place, lowering you search for resourses here and there.</li>
                                            <li>Can practice problems all at one place.</li>
                                            <li>Providing badges for motivation.</li>
                                            <li>Streak for monitoring consistency.</li>
                                            <li>Can clarify doubts via discussion forum.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="courses-div">
                        <div className="course-listing">
                            <div style={{ fontSize: "18px", fontWeight: "600", position: "sticky", top: "-15px", backgroundColor: "var(--background)", padding: "10px", borderBottom: "2px solid var(--border-color)" }}>Courses Available</div>
                            {courses.map((course, index) => (
                                <div className="each-course" key={index}>
                                    <div className="course-img">
                                        <img src={courseImages[course.image]} alt={course.name} />
                                    </div>
                                    <p className="course-name">{course.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="contact-div">
                    <div className="contact-card">
                        <h2 style={{ display: "flex", alignItems: "center", gap: "5px", padding: "10px 0px" }}><PermPhoneMsgIcon />Contact Us</h2>
                        <hr />
                        <div className="contact-flex">
                            <form style={{ flex: "3" }}>
                                <div className="name">
                                    <label>Name:</label>
                                    <InputBox
                                        value={name}
                                        onChange={handleNameChange}
                                        placeholder="Enter your name here"
                                    />
                                </div>
                                <div className="email">
                                    <label>Email:</label>
                                    <InputBox
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder="Enter your email here"
                                    />
                                </div>
                                <div className="message">
                                    <label>Message:</label>
                                    <textarea value={message}
                                        onChange={handleMessageChange}
                                        placeholder="Your Message"
                                        style={{ width: "100%", margin: "5px 0px", borderRadius: "5px", padding: "5px", boxSizing: "border-box", resize: "none", backgroundColor: "var(--background)", color: "var(--text)" }}
                                        rows={5}
                                    >
                                    </textarea>
                                </div>
                            </form>
                            <div style={{ flex: "2" }}>
                                <div className="content">
                                    <div style={{ fontSize: "20px", fontWeight: "700" }}>Get in Touch</div>
                                    <hr style={{ width: "100%" }} />
                                    <p>Have questions or need assistance? We’re here to help! Whether you're a student seeking course information or an educator interested in collaborating, feel free to reach out, and we'll get back to you soon.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
