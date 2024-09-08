import React from 'react';
import Select from 'react-select';
import customStyles from '../appLayout/selectTheme';

const CustomSelect = ({ options, onChange, value, placeholder }) => {
    return (
        <div style={{margin:"5px 0px"}}>
            <Select
                options={options}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                styles={customStyles}
                classNamePrefix="custom-select"
            />
        </div>
    );
};

export default CustomSelect;
