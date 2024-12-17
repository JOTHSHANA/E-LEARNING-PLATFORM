import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/appLayout/Layout";
import "./Practice.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import requestApi from "../../components/utils/axios";


function TopicQuestions() {
    const { topicId } = useParams();  
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]); 
    const [topics, setTopics] = useState([])
    const [searchInput, setSearchInput] = useState("");
    const [selectedDifficulties, setSelectedDifficulties] = useState({
        All: true,
        Easy: false,
        Medium: false,
        Hard: false,
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Fetch questions for the selected topicId
    const fetchQuestions = async (id) => {
        try {
            const response = await requestApi("POST", "/questions", { topic: id });  // API call to fetch questions
            setQuestions(response.data.gQuestions || []);  
            setTopics(response.data.topicQuery[0].name)
            console.log(topics)

        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    useEffect(() => {
        fetchQuestions(topicId);  // Fetch questions when topicId changes
    }, [topicId]);
    
    const closeFilterMenu = () => {
        setIsFilterOpen(false);
    }

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
        navigate(`/practice/${topicId}/${questionId}`);  // Navigate to the question detail page
    };

    const filteredQuestions = questions.filter((q) => {
        const matchesSearch = q.questions.toLowerCase().includes(searchInput.toLowerCase());
        const matchesDifficulty = selectedDifficulties.All || selectedDifficulties[q.difficulty];
        return matchesSearch && matchesDifficulty;
    });

    return (
        <Layout
            body={
                <div className="question-page">
                    <div className="questions-div">
                        <div className="topic-and-search">
                            <h2>{topics}</h2>
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
                            </div>
                            {isFilterOpen && (
                                <div className="difficulty-filter-menu">
                                    <div className="flex">
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
                                        <button className="close-filter" onClick={closeFilterMenu}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Difficulty Filter Menu */}


                        <ul className="question-list">
                            {filteredQuestions.map((q) => (
                                <li className="ques-box" key={q.id} onClick={() => handleQuestionSelect(q.id)}>
                                    <div className="star-difficulty">
                                        <p style={{
                                            backgroundColor:
                                                q.difficulty === 'Easy' ? 'rgba(0, 255, 174, 0.419)' :
                                                    q.difficulty === 'Medium' ? 'rgba(0, 174, 255, 0.419)' :
                                                        q.difficulty === 'Hard' ? 'rgba(255, 64, 0, 0.255)' : 'gray',
                                            padding: "2px 10px", width: "fit-content", borderRadius: "5px", marginBottom: "15px", fontWeight: "600"
                                        }}>{q.difficulty}</p>
                                    </div>
                                    <p className="ques">{q.questions}</p>
                                    <button className="solve-button" onClick={() => handleQuestionSelect(q)}>Start Solving</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="question-user-info">
                        {/* Additional user info can go here */}
                    </div>
                </div>
            }
        />
    );
}

export default TopicQuestions;
