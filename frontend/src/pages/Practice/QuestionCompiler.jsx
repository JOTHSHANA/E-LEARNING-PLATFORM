import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Typography } from '@mui/material';
import requestApi from "../../components/utils/axios"; // Assuming you have a utility function for API requests
import "./Practice.css";
import Layout from "../../components/appLayout/Layout";

function QuestionCompiler() {
    return <Layout body={<Body />} />;
}

function Body() {
    const { topicId, quesId } = useParams(); // Get topicId and questionId from URL params
    const [question, setQuestion] = useState(null); // State to store the question details
    const [code, setCode] = useState("// Write your code here");
    const [languages, setLanguages] = useState(""); // State to store available languages as a string
    const [preferredLang, setPreferredLang] = useState(""); // State to store the selected language
    const [results, setResults] = useState()

    // Fetch question details based on questionId
    const fetchQuestionDetails = async (quesId) => {
        try {
            const response = await requestApi("POST", "/questions-id", { id: quesId });
            setQuestion(response.data.questions[0]); // Assuming the API returns an array with the question data
            setLanguages(response.data.topicQuery[0].languages); // Set available languages from API response
        } catch (error) {
            console.error("Error fetching question details:", error);
        }
    };


    const evaluateCode = async (preferredLang, quesId, code) => {
        
        if (preferredLang == "C" || preferredLang == "C++") {

            try {
                const response = await requestApi("POST", "/compile-c", {
                    language: preferredLang,
                    quesId: quesId,
                    code: code
                });
                setResults(response.data); // Assuming the API returns an array with the question data
            } catch (error) {
                console.error("Error fetching question details:", error);
            }
        }
        else {

        }
    };



    useEffect(() => {
        if (quesId) {
            fetchQuestionDetails(quesId); // Fetch question details when quesId is available
        }
    }, [quesId]);

    const handleEditorChange = (value) => {
        setCode(value); // Update the code in the editor
    };

    const handleLanguageChange = (event) => {
        setPreferredLang(event.target.value); // Update the preferred language based on user selection
        console.log(preferredLang)
    };

    return (
        <div className="problem-solving-page">
            <Typography variant="h6" className="topic-section">Topic: {topicId} | Question ID: {quesId}</Typography>
            <div className="question-page">
                <div className="question-content">
                    {question && (
                        <>
                            <p
                                style={{
                                    marginBottom: "20px",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    borderBottom: "1px solid var(--border-color)"
                                }}
                            >
                                {question.questions}
                            </p>
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    marginBottom: "20px"
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th
                                            style={{
                                                border: "1px solid var(--border-color)",
                                                padding: "10px",
                                                textAlign: "left"
                                            }}
                                        >
                                            Test Case
                                        </th>
                                        <th
                                            style={{
                                                border: "1px solid var(--border-color)",
                                                padding: "10px",
                                                textAlign: "left"
                                            }}
                                        >
                                            Input
                                        </th>
                                        <th
                                            style={{
                                                border: "1px solid var(--border-color)",
                                                padding: "10px",
                                                textAlign: "left"
                                            }}
                                        >
                                            Expected Output
                                        </th>
                                        <th
                                            style={{
                                                border: "1px solid var(--border-color)",
                                                padding: "10px",
                                                textAlign: "left"
                                            }}
                                        >
                                            Result
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <tr key={i}>
                                            <td
                                                style={{
                                                    border: "1px solid var(--border-color)",
                                                    padding: "10px"
                                                }}
                                            >
                                                TC {i}
                                            </td>
                                            <td
                                                style={{
                                                    border: "1px solid var(--border-color)",
                                                    padding: "10px"
                                                }}
                                            >
                                                {question[`t_case${i}`]}
                                            </td>
                                            <td
                                                style={{
                                                    border: "1px solid var(--border-color)",
                                                    padding: "10px"
                                                }}
                                            >
                                                {question[`t_output${i}`]}
                                            </td>
                                            <td
                                                style={{
                                                    border: "1px solid var(--border-color)",
                                                    padding: "10px"
                                                }}
                                            >
                                                Pending
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
                <div className="editor-container">
                    <select
                        name="lang"
                        id="lang-select"
                        value={preferredLang}
                        onChange={handleLanguageChange}
                        style={{
                            marginBottom: "20px",
                            padding: "10px",
                            border: "1px solid var(--border-color)",
                            borderRadius: "4px"
                        }}
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
                    <button onClick={evaluateCode(preferredLang, quesId, code)}>
                        Submit
                    </button>
                    <Editor
                        height="77vh"
                        defaultLanguage="javascript"
                        defaultValue={code}
                        theme="vs-dark"
                        onChange={handleEditorChange}
                        value={code}
                        style={{ padding: "20px" }}
                    />
                    {/* <button onClick={evaluateCode}>
                        Submit
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default QuestionCompiler;
