import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Editor from '@monaco-editor/react';
import './Practice.css';

function QuestionPage({ question }) {
    const [code, setCode] = useState('// Write your code here');

    const handleEditorChange = (value) => {
        setCode(value);
    };

    return (
        <div className="question-page">
            <div className="question-content">
                <Typography variant="h5">{question.question}</Typography>
            </div>
            <div className="editor-container">
                <Editor
                    height="90vh"
                    defaultLanguage="javascript"
                    defaultValue="// Write your code here"
                    theme="vs-dark"
                    onChange={handleEditorChange}
                    value={code}
                />
            </div>
        </div>
    );
}

export default QuestionPage;
