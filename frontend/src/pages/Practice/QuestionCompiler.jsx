import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Typography } from '@mui/material';
import requestApi from "../../components/utils/axios"; // Assuming you have a utility function for API requests
import "./Practice.css";


function QuestionCompiler() {
    const { topicId, quesId } = useParams();  // Get topicId and questionId from URL params
    const [question, setQuestion] = useState(null);  // State to store the question details
    const [code, setCode] = useState("// Write your code here");

    // Fetch question details based on questionId
    const fetchQuestionDetails = async (quesId) => {
        try {
            const response = await requestApi("POST", "/questions-id", { id: quesId });
            setQuestion(response.data[0]);  // Assuming the API returns an array with the question data
        } catch (error) {
            console.error("Error fetching question details:", error);
        }
    };

    useEffect(() => {
        if (quesId) {
            fetchQuestionDetails(quesId);  // Fetch question details when quesId is available
        }
    }, [quesId]);

    const handleEditorChange = (value) => {
        setCode(value);  // Update the code in the editor
    };

    return (
        <div className="question-page">
            <div className="question-content">
                <Typography variant="h6">Topic: {topicId} | Question ID: {quesId}</Typography>

                {question && (
                    <>
                        <Typography variant="h6" style={{ margin: "20px 0" }}>
                            {question.questions}  {/* Display the question */}
                        </Typography>

                        <div>
                            <Typography variant="body1">Test Case 1: {question.t_case1}</Typography>
                            <Typography variant="body2">Expected Output: {question.t_output1}</Typography>

                            <Typography variant="body1">Test Case 2: {question.t_case2}</Typography>
                            <Typography variant="body2">Expected Output: {question.t_output2}</Typography>

                            <Typography variant="body1">Test Case 3: {question.t_case3}</Typography>
                            <Typography variant="body2">Expected Output: {question.t_output3}</Typography>

                            <Typography variant="body1">Test Case 4: {question.t_case4}</Typography>
                            <Typography variant="body2">Expected Output: {question.t_output4}</Typography>

                            <Typography variant="body1">Test Case 5: {question.t_case5}</Typography>
                            <Typography variant="body2">Expected Output: {question.t_output5}</Typography>
                        </div>
                    </>
                )}
            </div>
            <div className="editor-container">
                <Editor
                    height="90vh"
                    defaultLanguage="javascript"
                    defaultValue={code}
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
