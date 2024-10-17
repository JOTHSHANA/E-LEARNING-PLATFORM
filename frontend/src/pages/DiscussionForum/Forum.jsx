import React, { useState } from "react";
import Layout from "../../components/appLayout/Layout";
import './Forum.css';
import Button from "../../components/Button/Button";
import CustomSelect from "../../components/Select/Select";
import customStyles from "../../components/appLayout/selectTheme";
import InputBox from "../../components/InputBox/InputBox";

function Forum() {
    return <Layout rId={1} body={<Body />} />;
}

function Body() {

    return (
        <>
            Discussion Forum
        </>
    );
}

export default Forum;
