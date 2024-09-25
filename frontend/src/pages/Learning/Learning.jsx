import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/appLayout/Layout";
import './Learning.css'; // Import the new CSS
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

function Learning() {
    return <Layout rId={1} body={<Body />} />;
}

function Body() {
    const location = useLocation();
    const { courseId } = location.state || {};
    const userId = getDecryptedCookie("id");
    return (
        <div className="total-learning-page">
            learning page
        </div>
    );
}

export default Learning;
