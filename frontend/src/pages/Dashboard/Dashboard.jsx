import React, { useState } from "react";
import Layout from "../../components/appLayout/Layout";
import './Dashboard.css';

function Dashboard() {
    return <Layout rId={1} body={<Body />} />;
}

function Body() {

    return (
        <>
            Dashboard
        </>
    );
}

export default Dashboard;
