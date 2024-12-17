import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import "./Practice.css";

function QuestionCompiler() {
    const { topicName, quesId } = useParams();
    const [code, setCode] = useState("// Write your code here");

    const handleEditorChange = (value) => {
        setCode(value);
    };

    return (
        <div>
            <h2>
                Topic: {topicName} | Question ID: {quesId}
            </h2>
            <Editor
                height="90vh"
                defaultLanguage="javascript"
                value={code}
                theme="vs-dark"
                onChange={handleEditorChange}
            />
        </div>
    );
}

export default QuestionCompiler;
