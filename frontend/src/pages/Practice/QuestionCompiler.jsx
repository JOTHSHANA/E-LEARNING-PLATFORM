import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Typography } from '@mui/material';
import requestApi from "../../components/utils/axios";
import "./Practice.css";
import Layout from "../../components/appLayout/Layout";
import { use } from "react";

function QuestionCompiler() {
    return <Layout body={<Body />} />;
}

function Body() {
    const { topicId, quesId } = useParams();
    const [question, setQuestion] = useState(null);
    const [code, setCode] = useState("// Write your code here");
    const [languages, setLanguages] = useState("");
    const [preferredLang, setPreferredLang] = useState("");
    const [results, setResults] = useState(null);
    const [isCompiling, setIsCompiling] = useState(false);
    const [currTopic, setCurrTopic] = useState("")

    const fetchQuestionDetails = async (quesId) => {
        try {
            const response = await requestApi("POST", "/questions-id", { id: quesId , topic:topicId});
            setQuestion(response.data.questions[0]);
            // console.log("hi")
            console.log(response)
            setLanguages(response.data.topicQuery[0].languages);
            setCurrTopic(response.data.topicQuery[0].name)
            const defaultLang = response.data.topicQuery[0].languages.split(",")[0];
            setPreferredLang(defaultLang);
        } catch (error) {
            console.error("Error fetching question details:", error);
        }
    };

    const evaluateCode = async (preferredLang, quesId, code) => {
        setIsCompiling(true);
        try {
            let response;
            if (preferredLang === "C" || preferredLang === "C++") {
                response = await requestApi("POST", "/compile-c", {
                    language: preferredLang,
                    questionId: parseInt(quesId),
                    code: code,
                });
            } else if (preferredLang === "JAVA") {
                response = await requestApi("POST", "/compile-java", {
                    questionId: parseInt(quesId),
                    code: code,
                });
            } else if (preferredLang === "PYTHON") {
                response = await requestApi("POST", "/compile-py", {
                    questionId: parseInt(quesId),
                    code: code,
                });
            } else {
                response = await requestApi("POST", "/compile-js", {
                    questionId: parseInt(quesId),
                    code: code,
                });
            }
            setResults(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error evaluating code:", error);
        } finally {
            setIsCompiling(false); // Reset to false after compiling ends
        }
    };

    useEffect(() => {
        if (quesId) {
            fetchQuestionDetails(quesId);
        }
    }, [quesId]);

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const handleLanguageChange = (event) => {
        setPreferredLang(event.target.value);
    };

    const getCardStyle = (status) => {
        switch (status) {
            case "Passed":
                return { backgroundColor: "green", color: "white" };
            case "Failed":
                return { backgroundColor: "red", color: "white" };
            default:
                return { backgroundColor: "white", color: "black" };
        }
    };

    const overallCardStyle = results
        ? results.status === "Passed"
            ? { backgroundColor: "green", color: "white" }
            : { backgroundColor: "red", color: "white" }
        : { backgroundColor: "white", color: "black" };

    return (
        <div className="problem-solving-page">
            <Typography variant="h6" className="topic-section">
                <b>{currTopic}</b>
            </Typography>
            <div className="question-page">
                <div className="question-content">
                    {question && (
                        <>
                            <p
                                style={{
                                    marginBottom: "20px",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    borderBottom: "1px solid var(--border-color)",
                                }}
                            >
                                {question.questions}
                            </p>

                            <div className="test-case-cards">
                                {results?.testCaseResults.map((testCase, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            padding: "10px",
                                            margin: "10px 0",
                                            borderRadius: "8px",
                                            display: "flex",
                                            gap: "10px",
                                            position: "relative", // Enable relative positioning for the card
                                            backgroundColor: "var(--background)", // Optional: add background for better visibility
                                            border: "1px solid var(--border-color)"
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute", // Position the status badge
                                                top: "10px", // Align at the top
                                                right: "10px", // Align at the right
                                                backgroundColor:
                                                    testCase.status === "Passed"
                                                        ? "#4CAF50" // Green for "Pass"
                                                        : testCase.status === "Failed"
                                                            ? "#F44336" // Red for "Fail"
                                                            : "#FFEB3B", // Yellow for "Pending"
                                                color: testCase.status === "Pending" ? "black" : "white", // Black text for yellow, white otherwise
                                                padding: "5px 10px", // Add padding
                                                borderRadius: "5px", // Rounded corners
                                                fontSize: "12px", // Adjust font size
                                                fontWeight: "bold", // Make the text bold
                                                border: "1px solid var(--border-color)"
                                            }}
                                        >
                                            {testCase.status}
                                        </div>
                                        <div>
                                            <p>{testCase.testCase}</p>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <p>
                                                <strong>Input:</strong>{" "}
                                                {testCase.input.map((inputVal, i) => (
                                                    <span key={i}>{inputVal}</span>
                                                ))}
                                            </p>
                                            <div style={{ display: "flex", gap: "20px" }}>
                                                <p>
                                                    <strong>Expected Output:</strong> {testCase.expected}
                                                </p>
                                                <p>
                                                    <strong>Actual Output:</strong> {testCase.actual}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Overall Result Card */}
                            <div
                                style={{
                                    ...overallCardStyle,
                                    padding: "10px",
                                    marginTop: "20px",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                    textAlign: "center",
                                }}
                            >
                                <h3>Overall Status: {results?.status || "Pending"}</h3>
                            </div>
                        </>
                    )}
                </div>
                <div className="editor-container">
                    <select
                        name="lang"
                        id="lang-select"
                        value={preferredLang}
                        onChange={handleLanguageChange}
                        style={selectStyle}
                    >
                        <option value="" disabled>
                            -- Select a Language --
                        </option>
                        {languages.split(",").map((lang, index) => (
                            <option key={index} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>

                    <Editor
                        height="65vh"
                        defaultLanguage={preferredLang.toLowerCase()}
                        value={code}
                        theme="vs-dark"
                        onChange={handleEditorChange}
                        style={{ padding: "20px" }}
                    />

                    <button
                        style={{
                            float: "right",
                            backgroundColor: isCompiling ? "grey" : "#4CAF50",
                            border: "none",
                            padding: "10px 25px",
                            fontWeight: "600",
                            borderRadius: "10px",
                            color: "white",
                            cursor: isCompiling ? "not-allowed" : "pointer",
                        }}
                        onClick={() => evaluateCode(preferredLang, quesId, code)}
                        disabled={isCompiling} // Disable the button when loading
                    >
                        {isCompiling ? "Compiling..." : "RUN"}
                    </button>
                </div>
            </div>
        </div>
    );
}

const selectStyle = {
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid var(--border-color)",
    borderRadius: "4px",
};

export default QuestionCompiler;
