import React, { useState, useEffect } from "react";
import Layout from "../../components/appLayout/Layout";
import "./Practice.css";
import { getDecryptedCookie } from "../../components/utils/encrypt";
import requestApi from "../../components/utils/axios";
import WelcomePage from "./WelcomePage";
import TopicSelection from "./TopicSelection";
import QuestionPage from "./QuestionPage";

function Practice() {
    return <Layout body={<Body />} />;
}

function Body() {
    const [openTopicSelection, setOpenTopicSelection] = useState(false);
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null); // Store topic object
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const dummyTopics = [
        { id: 1, name: 'If Statements' },
        { id: 2, name: 'If-Else Statements' },
        { id: 3, name: 'Loops' },
        { id: 4, name: 'Arrays' },
        { id: 5, name: 'Strings' },
        { id: 6, name: 'Pointers' },
    ];

    // Dummy data for questions
    const dummyQuestions = {
        2: [
            { id: 1, question: 'Write an if-else statement to check if a number is even or odd.', difficulty: 'Easy' },
            { id: 2, question: 'Write an if-else statement to check if a number is positive or negative.', difficulty: 'Medium' },
            { id: 2, question: 'Write an if-else statement to check if a number is positive or negative.', difficulty: 'Hard' },
        ],
        // Add more topics and questions as needed
    };

    useEffect(() => {
        // Simulate fetching topics from backend
        setTopics(dummyTopics);
    }, []);

    const handleStart = () => {
        setOpenTopicSelection(true);
    };

    const handleTopicSelect = (topicId) => {
        const selectedTopic = topics.find((topic) => topic.id === topicId); // Find the selected topic
        setSelectedTopic(selectedTopic); // Store the entire topic object
        setOpenTopicSelection(false);

        // Simulate fetching questions from backend
        setQuestions(dummyQuestions[topicId] || []);
    };

    const handleQuestionSelect = (question) => {
        setSelectedQuestion(question);
    };

    return (
        <>
            <div>
                {!selectedQuestion ? (
                    !selectedTopic ? (
                        <>
                            <WelcomePage onStart={handleStart} />
                            <TopicSelection
                                open={openTopicSelection}
                                onClose={() => setOpenTopicSelection(false)}
                                topics={topics}
                                onSelect={handleTopicSelect}
                            />
                        </>
                    ) : (
                        <div className="question-page">
                            <div className="questions-div">
                                <h2>{selectedTopic.name}</h2>
                                <ul className="question-list">
                                    {questions.map((q) => (
                                        <li className="ques-box" key={q.id} onClick={() => handleQuestionSelect(q)}>
                                            <div className="star-difficulty">

                                                <p style={{
                                                    backgroundColor:
                                                        q.difficulty === 'Easy' ? 'rgba(0, 255, 174, 0.419)' :
                                                            q.difficulty === 'Medium' ? 'rgba(0, 174, 255, 0.419)' :
                                                                q.difficulty === 'Hard' ? 'rgba(255, 64, 0, 0.255)' : 'gray',
                                                    padding: "2px 10px", width: "fit-content", borderRadius: "5px", marginBottom: "15px", fontWeight: "600"
                                                }}>{q.difficulty}</p>
                                                <p></p>
                                            </div>
                                            <p className="ques">{q.question}</p>
                                            <button className="solve-button">Start Solving</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="question-user-info">

                            </div>
                        </div>
                    )
                ) : (
                    <QuestionPage question={selectedQuestion} />
                )}
            </div>
        </>
    );
}

export default Practice;
