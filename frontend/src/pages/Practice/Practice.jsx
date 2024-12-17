// import React, { useState, useEffect } from "react";
// import Layout from "../../components/appLayout/Layout";
// import "./Practice.css";
// import WelcomePage from "./WelcomePage";
// import TopicSelection from "./TopicSelection";
// import QuestionPage from "./QuestionPage";
// import SearchIcon from "@mui/icons-material/Search";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";

// function Practice() {
//     return <Layout body={<Body />} />;
// }

// function Body() {
//     const [openTopicSelection, setOpenTopicSelection] = useState(false);
//     const [topics, setTopics] = useState([]);
//     const [selectedTopic, setSelectedTopic] = useState(null);
//     const [questions, setQuestions] = useState([]);
//     const [selectedQuestion, setSelectedQuestion] = useState(null);
//     const [searchInput, setSearchInput] = useState('');
//     const [selectedDifficulties, setSelectedDifficulties] = useState({
//         All: true,
//         Easy: false,
//         Medium: false,
//         Hard: false,
//     });
//     const [isFilterOpen, setIsFilterOpen] = useState(false);

//     const dummyTopics = [
//         { id: 1, name: 'If Statements' },
//         { id: 2, name: 'If-Else Statements' },
//         { id: 3, name: 'Loops' },
//         { id: 4, name: 'Arrays' },
//         { id: 5, name: 'Strings' },
//         { id: 6, name: 'Pointers' },
//     ];

//     const dummyQuestions = {
//         2: [
//             { id: 1, question: 'Write an if-else statement to check if a number is even or odd.', difficulty: 'Easy' },
//             { id: 2, question: 'Write an if-else statement to check if a number is positive or negative.', difficulty: 'Medium' },
//             { id: 3, question: 'Write an if-else statement to check if a number is positive or negative.', difficulty: 'Hard' },
//         ],
//     };

//     useEffect(() => {
//         setTopics(dummyTopics);
//     }, []);

//     const handleStart = () => {
//         setOpenTopicSelection(true);
//     };

//     const handleTopicSelect = (topicId) => {
//         const selectedTopic = topics.find((topic) => topic.id === topicId);
//         setSelectedTopic(selectedTopic);
//         setOpenTopicSelection(false);
//         setQuestions(dummyQuestions[topicId] || []);
//     };

//     const handleQuestionSelect = (question) => {
//         setSelectedQuestion(question);
//     };

//     const handleDifficultyChange = (difficulty) => {
//         if (difficulty === "All") {
//             setSelectedDifficulties({
//                 All: true,
//                 Easy: false,
//                 Medium: false,
//                 Hard: false,
//             });
//         } else {
//             setSelectedDifficulties((prev) => ({
//                 ...prev,
//                 [difficulty]: !prev[difficulty],
//                 All: false,
//             }));
//         }
//     };

//     const toggleFilterMenu = () => {
//         setIsFilterOpen(!isFilterOpen);
//     };

//     const closeFilterMenu = () => {
//         setIsFilterOpen(false);
//     };

//     const filteredQuestions = questions.filter((q) => {
//         const matchesSearch = q.question.toLowerCase().includes(searchInput.toLowerCase());
//         const matchesDifficulty = selectedDifficulties.All || selectedDifficulties[q.difficulty];
//         return matchesSearch && matchesDifficulty;
//     });

//     return (
//         <>
//             <div>
//                 {!selectedQuestion ? (
//                     !selectedTopic ? (
//                         <>
//                             <WelcomePage onStart={handleStart} />
//                             <TopicSelection
//                                 open={openTopicSelection}
//                                 onClose={() => setOpenTopicSelection(false)}
//                                 topics={topics}
//                                 onSelect={handleTopicSelect}
//                             />
//                         </>
//                     ) : (
//                         <div className="question-page">
//                             <div className="questions-div">
//                                 <div className="topic-and-search">
//                                     <h2>{selectedTopic.name}</h2>
//                                     <div className="search-and-filter">
//                                         <div className="search-container">
//                                             <SearchIcon className="search-icon" />
//                                             <input
//                                                 type="text"
//                                                 placeholder="Search questions..."
//                                                 value={searchInput}
//                                                 onChange={(e) => setSearchInput(e.target.value)}
//                                                 className="search-box"
//                                             />
//                                         </div>
//                                         <FilterAltIcon
//                                             className="filter-icon"
//                                             onClick={toggleFilterMenu}
//                                         />
//                                     </div>
//                                     {isFilterOpen && (
//                                         <div className="difficulty-filter-menu">
//                                             <div className="flex">
//                                                 <label>
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={selectedDifficulties.Easy}
//                                                         onChange={() => handleDifficultyChange('Easy')}
//                                                     />
//                                                     Easy
//                                                 </label>
//                                                 <label>
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={selectedDifficulties.Medium}
//                                                         onChange={() => handleDifficultyChange('Medium')}
//                                                     />
//                                                     Medium
//                                                 </label>
//                                                 <label>
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={selectedDifficulties.Hard}
//                                                         onChange={() => handleDifficultyChange('Hard')}
//                                                     />
//                                                     Hard
//                                                 </label>
//                                                 <label>
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={selectedDifficulties.All}
//                                                         onChange={() => handleDifficultyChange('All')}
//                                                     />
//                                                     All Questions
//                                                 </label>
//                                                 <button className="close-filter" onClick={closeFilterMenu}>
//                                                     Close
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Difficulty Filter Menu */}


//                                 <ul className="question-list">
//                                     {filteredQuestions.map((q) => (
//                                         <li className="ques-box" key={q.id} >
//                                             <div className="star-difficulty">
//                                                 <p style={{
//                                                     backgroundColor:
//                                                         q.difficulty === 'Easy' ? 'rgba(0, 255, 174, 0.419)' :
//                                                             q.difficulty === 'Medium' ? 'rgba(0, 174, 255, 0.419)' :
//                                                                 q.difficulty === 'Hard' ? 'rgba(255, 64, 0, 0.255)' : 'gray',
//                                                     padding: "2px 10px", width: "fit-content", borderRadius: "5px", marginBottom: "15px", fontWeight: "600"
//                                                 }}>{q.difficulty}</p>
//                                             </div>
//                                             <p className="ques">{q.question}</p>
//                                             <button className="solve-button" onClick={() => handleQuestionSelect(q)}>Start Solving</button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                             <div className="question-user-info">
//                                 {/* Additional user info can go here */}
//                             </div>
//                         </div>
//                     )
//                 ) : (
//                     <QuestionPage question={selectedQuestion} />
//                 )}
//             </div>
//         </>
//     );
// }

// export default Practice;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/appLayout/Layout";
import TopicSelection from "./TopicSelection";
import WelcomePage from "./WelcomePage";
import "./Practice.css";

function Practice() {
    const [openTopicSelection, setOpenTopicSelection] = useState(false);
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();

    const dummyTopics = [
        { id: 1, name: "If Statements" },
        { id: 2, name: "If-Else Statements" },
        { id: 3, name: "Loops" },
        { id: 4, name: "Arrays" },
        { id: 5, name: "Strings" },
        { id: 6, name: "Pointers" },
    ];

    useEffect(() => {
        setTopics(dummyTopics);
    }, []);

    const handleStart = () => {
        setOpenTopicSelection(true);
    };

    const handleTopicSelect = (topicId) => {
        const selectedTopic = topics.find((topic) => topic.id === topicId);
        if (selectedTopic) {
            navigate(`/practice/${selectedTopic.name}`);
        }
    };

    return (
        <Layout
            body={
                <>
                    <WelcomePage onStart={handleStart} />
                    <TopicSelection
                        open={openTopicSelection}
                        onClose={() => setOpenTopicSelection(false)}
                        topics={topics}
                        onSelect={handleTopicSelect}
                    />
                </>
            }
        />
    );
}

export default Practice;
