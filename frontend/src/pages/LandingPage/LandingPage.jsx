// import React, { useState } from "react";
// import Layout from "../../components/appLayout/Layout";
// import './LandingPage.css';
// import Button from "../../components/Button/Button";
// import CustomSelect from "../../components/Select/Select";
// import customStyles from "../../components/appLayout/selectTheme";
// import InputBox from "../../components/InputBox/InputBox";
// import TopBar from "../../components/appLayout/TopBar";
// import study from '../../assets/study.png'
// import give from '../../assets/give.png'
// import take from '../../assets/take.png'
// import react from '../../assets/react.png';
// import html from '../../assets/html.png';
// import css from '../../assets/css.png';
// import js from '../../assets/js.png';
// import c from '../../assets/c.png';
// import cpp from '../../assets/cpp.png';
// import java from '../../assets/java.png';
// import python from '../../assets/python.png';
// import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
// import { Box, IconButton } from '@mui/material';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import EmailIcon from '@mui/icons-material/Email';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import FacebookIcon from '@mui/icons-material/Facebook';



// const courseImages = {
//     c: c,
//     cpp: cpp,
//     java: java,
//     python: python,
//     html: html,
//     css: css,
//     js: js,
//     react: react
// };

// const courses = [
//     { name: "C PROGRAMMING", image: "c" },
//     { name: "C++ PROGRAMMING", image: "cpp" },
//     { name: "JAVA PROGRAMMING", image: "java" },
//     { name: "PYTHON PROGRAMMING", image: "python" },
//     { name: "HTML", image: "html" },
//     { name: "CSS", image: "css" },
//     { name: "JAVASCRIPT", image: "js" },
//     { name: "REACT JS", image: "react" }
// ];

// function LandingPage() {
//     return <Body />;
// }

// function Body() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState("");

//     const handleClick = () => {

//     }

//     const [selectedOption, setSelectedOption] = useState(null);

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
//     const handleNameChange = (event) => {
//         setName(event.target.value);
//         console.log(name);
//     }
//     const handleEmailChange = (event) => {
//         setEmail(event.target.value)
//     }
//     const handleMessageChange = (event) => {
//         setMessage(event.target.value);
//     }

//     const handleContactSubmit = () => {

//     }

//     return (
//         <div className="landing-page">
//             <div style={{ position: "sticky", top: "0px", zIndex: "10" }}>
//                 <TopBar />
//             </div>
//             <div className="landing-body">
//                 <div className="intro-div">
//                     <div className="about-div">
//                         <h1 className="quote">Learn Beyond Boundaries, gain knowledge Without Limits!</h1>
//                         <p className="user-text">Discover exciting courses designed just for you! Join our platform to learn new skills, explore your interests, and start your journey to success. Sign up today and take the first step toward a brighter future!</p>
//                     </div>
//                     <div className="courses-div">

//                     </div>

//                 </div>
//                 <div className="contact-div">
//                     <div className="contact-card">
//                         <h2 style={{ display: "flex", alignItems: "center", gap: "5px", padding: "10px 0px" }}><PermPhoneMsgIcon sx={{ color: "#0170e7" }} />Contact Us</h2>
//                         <hr />
//                         <div className="contact-flex">
//                             <form style={{ flex: "3" }}>
//                                 <div className="name">
//                                     <label>Name:</label>
//                                     <InputBox
//                                         value={name}
//                                         onChange={handleNameChange}
//                                         placeholder="Enter your name here"
//                                     />
//                                 </div>
//                                 <div className="email">
//                                     <label>Email:</label>
//                                     <InputBox
//                                         value={email}
//                                         onChange={handleEmailChange}
//                                         placeholder="Enter your email here"
//                                     />
//                                 </div>
//                                 <div className="message">
//                                     <label>Message:</label>
//                                     <textarea value={message}
//                                         onChange={handleMessageChange}
//                                         placeholder="Your Message"
//                                         style={{ width: "100%", margin: "5px 0px", borderRadius: "5px", padding: "5px", boxSizing: "border-box", resize: "none", backgroundColor: "var(--background)", color: "var(--text)" }}
//                                         rows={5}
//                                     >
//                                     </textarea>
//                                 </div>
//                                 <div style={{ float: "right" }}>
//                                     <Button
//                                         color="#fff"
//                                         backgroundColor="#007bff"
//                                         text="Submit"
//                                         onClick={handleContactSubmit}
//                                     />
//                                 </div>
//                             </form>
//                             <div style={{ flex: "2" }}>
//                                 <div className="content">
//                                     <div style={{ fontSize: "20px", fontWeight: "700" }}>Get in Touch</div>
//                                     <hr style={{ width: "100%" }} />
//                                     <p>Have questions or need assistance? We’re here to help! Whether you're a student seeking course information or an educator interested in collaborating, feel free to reach out, and we'll get back to you soon.</p>

//                                     <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                                         <IconButton
//                                             component="a"
//                                             href="https://wa.me/your-number"
//                                             target="_blank"
//                                             color="primary"
//                                         >
//                                             <WhatsAppIcon fontSize="medium" sx={{ color: "white", padding: "5px", backgroundColor: "#0dbc79", borderRadius: "30px" }} />
//                                         </IconButton>
//                                         <IconButton
//                                             component="a"
//                                             href="mailto:your-email@example.com"
//                                             target="_blank"
//                                             color="primary"
//                                         >
//                                             <EmailIcon sx={{ color: "#2872dd", padding: "5px", backgroundColor: "#ffffff", borderRadius: "30px" }} fontSize="medium" />
//                                         </IconButton>
//                                         <IconButton
//                                             component="a"
//                                             href="https://github.com/your-username"
//                                             target="_blank"
//                                             color="primary"
//                                         >
//                                             <GitHubIcon sx={{ color: "white", padding: "5px", backgroundColor: "#000000", borderRadius: "30px" }} fontSize="medium" />
//                                         </IconButton>
//                                         <IconButton
//                                             component="a"
//                                             href="https://facebook.com/your-profile"
//                                             target="_blank"
//                                             color="primary"
//                                         >
//                                             <FacebookIcon sx={{ color: "#3f5b9f", padding: "5px", backgroundColor: "#ffffff", borderRadius: "30px" }} fontSize="medium" />
//                                         </IconButton>
//                                     </Box>
//                                 </div>


//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LandingPage;
import React, { useRef, useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import Home from "../../pages/Home/home";
import About from "../../pages/About/about";
import Contact from "../../pages/Contact/contact";
import Course from "../../pages/Course/course";
import CustomizedSwitches from "../../components/appLayout/toggleTheme";
import LoginDialog from "../../pages/Login/Login";
import SignupDialog from "../../pages/Login/Signup";
import Button from "../../components/Button/Button";
import "./LandingPage.css";
import { Email, Phone } from '@mui/icons-material';

const useNavbarScroll = () => {
    const sectionRefs = {
        home: useRef(null),
        about: useRef(null),
        course: useRef(null),
        slot: useRef(null),
        contact: useRef(null),
    };

    const handleScroll = (section) => {
        const ref = sectionRefs[section]?.current;
        if (ref) {
            ref.scrollIntoView({ behavior: "smooth" });
        } else {
            console.error(`No reference found for section: ${section}`);
        }
    };
    return { sectionRefs, handleScroll };
};

const LandingPage = () => {
    const { sectionRefs, handleScroll } = useNavbarScroll();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [navbarTransparent, setNavbarTransparent] = useState(true);

    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);

    const handleLoginOpen = () => setOpenLogin(true);
    const handleLoginClose = () => setOpenLogin(false);

    const handleSignupOpen = () => setOpenSignup(true);
    const handleSignupClose = () => setOpenSignup(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setNavbarTransparent(false);
            } else {
                setNavbarTransparent(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`navbar ${navbarTransparent ? "transparent" : "solid"}`}
            >
                <nav>
                    <div
                        className={`hamburger-icon ${navbarTransparent ? "icon-transparent" : "icon-solid"
                            }`}
                        onClick={toggleNav}
                    >
                        <i className="fas fa-bars"></i>
                    </div>
                    <div>
                        <h2 className="app-name">TechLehren</h2>
                        <p style={{ fontFamily: "'Playpen Sans', cursive", fontSize: '12px', fontWeight: '700', letterSpacing: '1px' }}>Limitless Learning</p>
                    </div>
                    <ul className={isNavOpen ? "nav-open" : ""}>
                        <li onClick={() => handleScroll("home")}>Home</li>
                        <li onClick={() => handleScroll("about")}>About</li>
                        <li onClick={() => handleScroll("course")}>Course</li>
                        <li onClick={() => handleScroll("contact")}>Contact</li>
                    </ul>
                    <div>
                        <CustomizedSwitches />
                        <Button
                            color="#fff"
                            backgroundColor="#5c89aa"
                            text="Log In"
                            onClick={handleLoginOpen}
                        />
                        <Button
                            color="#fff"
                            backgroundColor="#007bff"
                            text="Sign Up"
                            onClick={handleSignupOpen}
                        />
                        <LoginDialog open={openLogin} onClose={handleLoginClose} />
                        <SignupDialog open={openSignup} onClose={handleSignupClose} />
                    </div>
                </nav>
                {isModalOpen && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="close-button" onClick={closeModal}>
                                &times;
                            </button>
                            <h2 style={{ color: "white" }}>Sign In</h2>
                            <Button
                                color="#fff"
                                backgroundColor="#5c89aa"
                                text="Log In"
                                onClick={handleLoginOpen}
                            />
                            <Button
                                color="#fff"
                                backgroundColor="#007bff"
                                text="Sign Up"
                                onClick={handleSignupOpen}
                            />
                        </div>

                    </div>

                )}
            </header>
            <main className="total-background">
                <Home ref={sectionRefs.home} />
                <br />
                <About ref={sectionRefs.about} />
                <br />
                <hr></hr>
                <br />
                <Course ref={sectionRefs.course} />
                <br />
            </main>
            <LoginDialog open={openLogin} onClose={handleLoginClose} />
            <SignupDialog open={openSignup} onClose={handleSignupClose} />

            <Contact ref={sectionRefs.contact} />
            
        </>
    );
};

export { LandingPage, useNavbarScroll };
