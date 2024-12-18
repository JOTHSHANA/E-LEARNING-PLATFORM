import React, { useState } from "react";
import Layout from "../../components/appLayout/Layout";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import './RoadMap.css'


const RoadMap = () => {
    return <Layout rId={1} body={<Body />} />;
};

const Body = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("HTML");

    // Define roadmaps for each language with week-based learning
    const roadmaps = {
        HTML: [
            { day: "Day 1", title: "Introduction to HTML", description: "Overview of HTML, its structure, and basic tags.", icon: <FastfoodIcon /> },
            { day: "Day 2", title: "HTML Document Structure", description: "Learn about <!DOCTYPE>, <html>, <head>, and <body>.", icon: <LaptopMacIcon /> },
            { day: "Day 3", title: "Text Elements", description: "Master headings, paragraphs, and inline text elements like <span>, <b>, <i>, etc.", icon: <HotelIcon /> },
            { day: "Day 4", title: "Lists", description: "Learn ordered (<ol>), unordered (<ul>), and description lists (<dl>).", icon: <RepeatIcon /> },
            { day: "Day 5", title: "Links and Anchors", description: "Understand <a>, href, target, and creating navigation menus.", icon: <FastfoodIcon /> },
            { day: "Day 6", title: "Images", description: "Embed images with <img> and explore attributes like src, alt, width, and height.", icon: <LaptopMacIcon /> },
            { day: "Day 7", title: "Tables", description: "Create tables with <table>, <tr>, <td>, <th>, and attributes like colspan and rowspan.", icon: <HotelIcon /> },
            { day: "Day 8", title: "Forms Basics", description: "Learn <form>, <input>, and submission basics.", icon: <RepeatIcon /> },
            { day: "Day 9", title: "Advanced Forms", description: "Explore validation, input types (email, date, color), and accessibility.", icon: <FastfoodIcon /> },
            { day: "Day 10", title: "Semantic HTML", description: "Understand <header>, <footer>, <article>, <section>, and semantic importance.", icon: <LaptopMacIcon /> },
            { day: "Day 11", title: "HTML5 Features", description: "Learn about new elements like <main>, <figure>, <figcaption>, <mark>, <time>, etc.", icon: <HotelIcon /> },
            { day: "Day 12", title: "Audio and Video", description: "Embed audio with <audio> and videos with <video> tags.", icon: <RepeatIcon /> },
            { day: "Day 13", title: "HTML Entities", description: "Learn about special characters and entities like &nbsp;, &lt;, &gt;, etc.", icon: <FastfoodIcon /> },
            { day: "Day 14", title: "IFrames", description: "Embed external content with <iframe> and learn sandboxing for security.", icon: <LaptopMacIcon /> },
            { day: "Day 15", title: "Inline and Block Elements", description: "Understand the difference between inline and block-level elements.", icon: <HotelIcon /> },
            { day: "Day 16", title: "Meta Tags", description: "Learn about <meta> tags for SEO, charset, viewport, and metadata.", icon: <RepeatIcon /> },
            { day: "Day 17", title: "Forms Accessibility", description: "Understand <label>, <fieldset>, <legend>, and ARIA attributes.", icon: <FastfoodIcon /> },
            { day: "Day 18", title: "HTML for SEO", description: "Learn about <title>, <meta>, heading hierarchy, and structured data.", icon: <LaptopMacIcon /> },
            { day: "Day 19", title: "Canvas", description: "Draw graphics and animations using the <canvas> element.", icon: <HotelIcon /> },
            { day: "Day 20", title: "SVG", description: "Create scalable vector graphics using <svg> and related elements.", icon: <RepeatIcon /> },
            { day: "Day 21", title: "Forms Security", description: "Explore techniques to secure forms with attributes like autocomplete, required, and pattern.", icon: <FastfoodIcon /> },
            { day: "Day 22", title: "Tables Accessibility", description: "Learn about <caption>, <summary>, and roles for accessible tables.", icon: <LaptopMacIcon /> },
            { day: "Day 23", title: "HTML Best Practices", description: "Write clean and maintainable HTML with proper formatting and comments.", icon: <HotelIcon /> },
            { day: "Day 24", title: "Responsive Images", description: "Understand srcset and picture elements for responsive image loading.", icon: <RepeatIcon /> },
            { day: "Day 25", title: "Forms API", description: "Explore JavaScript FormData API for form handling and validation.", icon: <FastfoodIcon /> },
            { day: "Day 26", title: "Web Accessibility", description: "Master accessibility principles with HTML for all users.", icon: <LaptopMacIcon /> },
            { day: "Day 27", title: "Offline HTML", description: "Learn about manifest files and offline support in HTML5.", icon: <HotelIcon /> },
            { day: "Day 28", title: "HTML Templates", description: "Use <template> and <slot> for reusable HTML structures.", icon: <RepeatIcon /> },
            { day: "Day 29", title: "Microdata and Schema", description: "Implement structured data with HTML microdata and schema.org.", icon: <FastfoodIcon /> },
            { day: "Day 30", title: "Final Project", description: "Build a complete webpage using all HTML features learned.", icon: <LaptopMacIcon /> }
        ]
        ,
        CSS: [
            { day: "Day 1", title: "Introduction to CSS", description: "Learn about CSS syntax, selectors, and how to apply styles to elements.", icon: <FastfoodIcon /> },
            { day: "Day 2", title: "CSS Box Model", description: "Understand the CSS box model: margin, border, padding, and content area.", icon: <LaptopMacIcon /> },
            { day: "Day 3", title: "Selectors and Specificity", description: "Learn about different types of CSS selectors (class, ID, descendant, etc.) and specificity.", icon: <HotelIcon /> },
            { day: "Day 4", title: "CSS Positioning", description: "Master positioning techniques: static, relative, absolute, fixed, and sticky.", icon: <RepeatIcon /> },
            { day: "Day 5", title: "Flexbox Basics", description: "Learn the fundamentals of Flexbox layout: containers, items, alignment, and distribution.", icon: <FastfoodIcon /> },
            { day: "Day 6", title: "Advanced Flexbox", description: "Master advanced Flexbox techniques: flex-grow, flex-shrink, flex-basis, and flex-wrap.", icon: <LaptopMacIcon /> },
            { day: "Day 7", title: "CSS Grid Layout", description: "Learn how to create responsive layouts using CSS Grid, including grid-template-columns and grid-template-rows.", icon: <HotelIcon /> },
            { day: "Day 8", title: "CSS Transitions", description: "Master CSS transitions to create smooth animations on hover and other interactions.", icon: <RepeatIcon /> },
            { day: "Day 9", title: "CSS Animations", description: "Learn how to create complex animations with keyframes and the animation property.", icon: <FastfoodIcon /> },
            { day: "Day 10", title: "Responsive Design", description: "Understand media queries and how to create mobile-first responsive designs using CSS.", icon: <LaptopMacIcon /> }
        ]
        ,
        JavaScript: [
            { day: "Day 1", title: "Introduction to JavaScript", description: "Learn about JavaScript syntax, data types, and basic operations.", icon: <FastfoodIcon /> },
            { day: "Day 2", title: "Variables and Data Types", description: "Explore different data types in JavaScript: strings, numbers, booleans, and objects.", icon: <LaptopMacIcon /> },
            { day: "Day 3", title: "Operators", description: "Understand JavaScript operators: arithmetic, comparison, logical, and assignment.", icon: <HotelIcon /> },
            { day: "Day 4", title: "Control Flow", description: "Learn about conditional statements: if, else, and switch.", icon: <RepeatIcon /> },
            { day: "Day 5", title: "Loops", description: "Master loops in JavaScript: for, while, and do-while.", icon: <FastfoodIcon /> },
            { day: "Day 6", title: "Functions Basics", description: "Learn how to define and call functions in JavaScript.", icon: <LaptopMacIcon /> },
            { day: "Day 7", title: "Arrow Functions", description: "Understand the syntax and use cases of arrow functions in JavaScript.", icon: <HotelIcon /> },
            { day: "Day 8", title: "Objects and Arrays", description: "Learn how to define and manipulate objects and arrays in JavaScript.", icon: <RepeatIcon /> },
            { day: "Day 9", title: "Array Methods", description: "Explore built-in array methods like map(), filter(), reduce(), and forEach().", icon: <FastfoodIcon /> },
            { day: "Day 10", title: "Object Methods", description: "Learn how to manipulate objects with methods like Object.keys(), Object.values(), and Object.assign().", icon: <LaptopMacIcon /> },
            { day: "Day 11", title: "DOM Manipulation", description: "Learn how to select and modify DOM elements using JavaScript.", icon: <HotelIcon /> },
            { day: "Day 12", title: "Event Handling", description: "Understand how to handle events like click, hover, keypress, etc.", icon: <RepeatIcon /> },
            { day: "Day 13", title: "Async JavaScript", description: "Learn about callback functions, promises, and async/await for asynchronous operations.", icon: <FastfoodIcon /> },
            { day: "Day 14", title: "Error Handling", description: "Understand try/catch blocks, error objects, and how to handle runtime errors.", icon: <LaptopMacIcon /> },
            { day: "Day 15", title: "ES6 Features", description: "Explore ES6 features like destructuring, spread/rest operators, and template literals.", icon: <HotelIcon /> },
            { day: "Day 16", title: "Classes and Objects", description: "Learn how to define classes and create instances of objects using ES6 classes.", icon: <RepeatIcon /> },
            { day: "Day 17", title: "Modules", description: "Understand how to import and export modules in JavaScript for better code organization.", icon: <FastfoodIcon /> },
            { day: "Day 18", title: "JavaScript Closures", description: "Learn about closures and their practical use cases in JavaScript.", icon: <LaptopMacIcon /> },
            { day: "Day 19", title: "JavaScript Recursion", description: "Master recursion and understand its application in problem-solving.", icon: <HotelIcon /> },
            { day: "Day 20", title: "JavaScript Best Practices", description: "Learn about code organization, debugging, and writing clean, maintainable JavaScript.", icon: <RepeatIcon /> }
        ]
        ,
        // Add more roadmaps for C, C++, Java, Python
    };

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="roadmap-page">
                <p>Roadmaps</p>
                <Select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    variant="outlined"
                    sx={{ marginBottom: "20px", width: "200px" }}
                >
                    {Object.keys(roadmaps).map((language) => (
                        <MenuItem key={language} value={language}>
                            {language}
                        </MenuItem>
                    ))}
                </Select>
                <CustomizedTimeline roadmap={roadmaps[selectedLanguage]} />
            </div>
        </div>
    );
};
const CustomizedTimeline = ({ roadmap }) => {
    // Define an array of colors for each step
    const colors = [
        'lightblue', 'lightgreen', 'lightcoral', 'lightpink', 'lightgoldenrodyellow',
        'lightseagreen', 'lightsteelblue', 'lightgray', 'lavender', 'lightskyblue',
        'lightyellow', 'lightcyan', 'lightgreen', 'thistle', 'darkorange',
        'mediumpurple', 'rosybrown', 'lightsalmon', 'lemonchiffon', 'lightblue',
        'lightgreen', 'peachpuff', 'lightslategrey', 'mediumturquoise', 'lightpink',
        'slateblue', 'wheat', 'mediumseagreen', 'aquamarine', 'cornflowerblue', 'darkviolet'
    ];

    return (
        <Timeline position="alternate">
            {roadmap.map((item, index) => (
                <TimelineItem key={index}>
                    <TimelineOppositeContent
                        sx={{ m: "auto 0" }}
                        align="right"
                        variant="body2"
                        color="text.secondary"
                    >
                        {item.day}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot sx={{ backgroundColor: colors[index % colors.length], color: 'white' }}>
                            {item.icon}
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                        <Typography variant="h6" component="span">
                            {item.title}
                        </Typography>
                        <Typography>{item.description}</Typography>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
};



export default RoadMap;
