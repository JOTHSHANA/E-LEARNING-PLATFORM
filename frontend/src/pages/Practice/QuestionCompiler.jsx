import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import "./Practice.css";
import { Typography } from '@mui/material';
import { useLocation } from "react-router-dom"; // Import useLocation


function QuestionCompiler() {
    const { topicName, quesId } = useParams();
    const [code, setCode] = useState("// Write your code here");

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const location = useLocation();
    const question = location.state?.question || "No question found."; // Get question from state

    return (

        <div className="question-page">
            <div className="question-content">
                <Typography variant="h6">Topic: {topicName} | Question ID: {quesId}</Typography>

                <Typography variant="body1" style={{ margin: "20px 0" }}>
                    Question: {question}
                </Typography>

            </div>
            <div className="editor-container">
                <Editor
                    height="90vh"
                    defaultLanguage="javascript"
                    defaultValue="// Write your code here"
                    theme="vs-dark"
                    onChange={handleEditorChange}
                    value={code}
                    style={{ padding: '20px' }}
                />
            </div>
        </div>
    );
}

export default QuestionCompiler;
