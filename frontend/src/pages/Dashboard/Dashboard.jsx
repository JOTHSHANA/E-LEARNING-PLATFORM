import React, { useState } from "react";
import Layout from "../../components/appLayout/Layout";
import './Dashboard.css';
import Button from "../../components/Button/Button";
import CustomSelect from "../../components/Select/Select";
import customStyles from "../../components/appLayout/selectTheme";
import InputBox from "../../components/InputBox/InputBox";

function Dashboard() {
    return <Layout rId={1} body={<Body />} />;
}

function Body() {
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

    return (
        <>
            Dashboard
            <Button
                color="#fff"
                backgroundColor="#007bff"
                text="Click Me"
                onClick={handleClick}
            />

            <CustomSelect
                style={customStyles}
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
                placeholder="Select an option"
            />

            <InputBox
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter text here"
            />
        </>
    );
}

export default Dashboard;
