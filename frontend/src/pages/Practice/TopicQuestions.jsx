import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/appLayout/Layout";
import "./Practice.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "./Practice.css";

function TopicQuestions() {
    const { topicName } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [selectedDifficulties, setSelectedDifficulties] = useState({
        All: true,
        Easy: false,
        Medium: false,
        Hard: false,
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const dummyQuestions = {
        "If-Else Statements": [
            { id: 1, question: "Check if a number is even or odd.", difficulty: "Easy" },
            { id: 2, question: "Check if a number is positive or negative.", difficulty: "Medium" },
            { id: 3, question: "Check if a number is prime.", difficulty: "Hard" },
        ],
    };

    useEffect(() => {
        setQuestions(dummyQuestions[topicName] || []);
    }, [topicName]);

    const handleDifficultyChange = (difficulty) => {
        if (difficulty === "All") {
            setSelectedDifficulties({
                All: true,
                Easy: false,
                Medium: false,
                Hard: false,
            });
        } else {
            setSelectedDifficulties((prev) => ({
                ...prev,
                [difficulty]: !prev[difficulty],
                All: false,
            }));
        }
    };

    const handleQuestionSelect = (questionId) => {
        navigate(`/practice/${topicName}/${questionId}`);
    };

    const filteredQuestions = questions.filter((q) => {
        const matchesSearch = q.question.toLowerCase().includes(searchInput.toLowerCase());
        const matchesDifficulty = selectedDifficulties.All || selectedDifficulties[q.difficulty];
        return matchesSearch && matchesDifficulty;
    });

    return (
        <Layout
            body={
                <div className="question-page">
                    <h2>{topicName}</h2>
                    <div className="search-and-filter">
                        <div className="search-container">
                            <SearchIcon className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="search-box"
                            />
                        </div>
                        <FilterAltIcon
                            className="filter-icon"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        />
                        {isFilterOpen && (
                            <div className="difficulty-filter-menu">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedDifficulties.Easy}
                                        onChange={() => handleDifficultyChange("Easy")}
                                    />
                                    Easy
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedDifficulties.Medium}
                                        onChange={() => handleDifficultyChange("Medium")}
                                    />
                                    Medium
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedDifficulties.Hard}
                                        onChange={() => handleDifficultyChange("Hard")}
                                    />
                                    Hard
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedDifficulties.All}
                                        onChange={() => handleDifficultyChange("All")}
                                    />
                                    All Questions
                                </label>
                            </div>
                        )}
                    </div>
                    <ul className="question-list">
                        {filteredQuestions.map((q) => (
                            <li key={q.id} onClick={() => handleQuestionSelect(q.id)}>
                                {q.question}
                            </li>
                        ))}
                    </ul>
                </div>
            }
        />
    );
}

export default TopicQuestions;
