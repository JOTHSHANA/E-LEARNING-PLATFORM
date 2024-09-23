
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
                <hr></hr>
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
