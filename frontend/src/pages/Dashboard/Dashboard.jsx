import React, { useState, useEffect } from "react";
import Layout from "../../components/appLayout/Layout";
import "./Dashboard.css";
import Button from "../../components/Button/Button";
import CustomSelect from "../../components/Select/Select";
import customStyles from "../../components/appLayout/selectTheme";
import InputBox from "../../components/InputBox/InputBox";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { getDecryptedCookie } from "../../components/utils/encrypt";
import profile from '../../assets/profile.png';
import html from "../../assets/html.png";
import css from "../../assets/css.png";
import js from "../../assets/js.png";
import react from "../../assets/react.png";
import c from "../../assets/c.png";
import cpp from "../../assets/cpp.png";
import python from "../../assets/python.png";
import java from "../../assets/java.png";
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BadgeIcon from '@mui/icons-material/Badge';
import requestApi from "../../components/utils/axios";


function Dashboard() {
  return <Layout rId={1} body={<Body />} />;
}

function Body() {
  const name = getDecryptedCookie("name");
  const handleClick = () => { };

  const [selectedOption, setSelectedOption] = useState(null);
  const [registeredCount, setRegisteredCount] = useState(0);
  const [registeredCourses, setRegisteredCourses] = useState([]);

  let completedCoursesCount = 0;

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log("Selected:", selectedOption);
  };

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log("Input value:", event.target.value);
  };

  // Original activity data
  const activityData = [
    { date: "2024-01-01", count: 1 },
    { date: "2024-01-02", count: 4 },
    { date: "2024-01-03", count: 2 },
    { date: "2024-01-04", count: 0 },
    { date: "2024-01-05", count: 5 },
    { date: "2024-01-06", count: 3 },
    { date: "2024-01-08", count: 1 },
  ];

  // Helper function to generate all dates between startDate and endDate
  const generateAllDates = (startDate, endDate) => {
    const dateArray = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split("T")[0];
      const activity = activityData.find((data) => data.date === dateString);
      dateArray.push({
        date: dateString,
        count: activity ? activity.count : -1, // Fill skipped dates with count -1
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  };

  const studentData = {
    name: "John Doe",
    studentId: "STU123456",
    course: "Full Stack Web Development",
    enrollmentDate: "Jan 10, 2024",
    profilePic: "https://via.placeholder.com/100",
    progress: 85,
    certificates: ["React Basics", "JavaScript Advanced"],
    notifications: [
      "Assignment 1 due in 2 days",
      "New React.js course available",
    ],
  };

  const startDate = new Date("2024-01-01");
  const endDate = new Date("2024-12-31");
  const allDates = generateAllDates(startDate, endDate); // Generate full date range with activity

  const courseProgressData = [
    {
      courseName: "HTML",
      progress: 90,
    },
    {
      courseName: "CSS",
      progress: 75,
    },
    {
      courseName: "JavaScript",
      progress: 60,
    },
    {
      courseName: "React",
      progress: 45,
    },
  ];

  const courseImages = {
    c: c,
    cpp: cpp,
    java: java,
    python: python,
    html: html,
    css: css,
    js: js,
    react: react
  };

  const getImageForCourse = (courseName) => {
    switch (courseName) {
      case "html":
        return htmlImage;
      case "css":
        return cssImage;
      case "js":
        return jsImage;
      case "react":
        return reactImage;
      case "c":
        return c;
      case "cpp":
        return cpp;
      case "java":
        return java;
      case "python":
        return python;
      default:
        return null;
    }
  };

  const dashboardData = {
    totalCourses: 8,
    productivityBadges: 5,
    courseBadges: 10,
    customValue: 50, // Dummy value for the last count box
  };


  const userId = getDecryptedCookie("id");

  const fetchRegisteredCoursesCount = async () => {
    console.log(userId);
    try {
      const response = await requestApi("GET", `/reg-course?user=${userId}`);

      setRegisteredCount(response.data.length);
      setRegisteredCourses(response.data);
      console.log(registeredCourses)
    } catch (error) {
      console.error('Error fetching registered courses count:', error);
    }
  };

  useEffect(() => {
    fetchRegisteredCoursesCount();
  }, []);

  return (
    <>
      <div className="total-dashboard">
        <div className="dashboard-content">
          <div className="profile-activity">
            <div className="profile-info">
              <img style={{ width: "150px", height: "150px", borderRadius: "50%" }} src={profile} alt="" />
              <div className="profile-details">
                <h2>{name}</h2>
                <p>{registeredCount} ongoing courses</p>
                <p>completed course count</p>
              </div>
            </div>
            <div className="progress-card">
              {registeredCourses.length > 0 ? (
                registeredCourses.map((registeredCourse, index) => {
                  if (registeredCourse.progress === 100) {
                    completedCoursesCount++; // Increment the count for completed courses
                    return null; // Skip rendering this course
                  }

                  return (
                    <div className="each-course" key={index}>
                      <div className="course-image">
                        <img src={courseImages[registeredCourse.Course.img]} alt={registeredCourse.Course.name} />
                      </div>
                      <div className="course-detail">
                        <p style={{ width: "100%" }}>{registeredCourse.Course.name}</p>
                        <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
                          <div className="progress-bar">
                            <div
                              className="filler"
                              style={{ width: `${registeredCourse.progress}%` }}
                            ></div>
                          </div>
                          <span className="progress-percentage">{registeredCourse.progress}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No courses Registered</p>
              )}

            </div>

          </div>
          <div className="count-activity">
            <div className="count-info">
              <div className="each-count-box">
                <SchoolIcon sx={{ fontSize: "30px", color: "#b871e3" }} className="count-icon" />
                <div className="count-details">
                  <h4>Total Courses Registered</h4>
                  <span>{registeredCount}</span>
                </div>
              </div>

              <div className="each-count-box">
                <EmojiEventsIcon sx={{ fontSize: "30px", color: "yellow" }} className="count-icon" />
                <div className="count-details">
                  <h4>Productivity Badge Count</h4>
                  <span>{dashboardData.productivityBadges}</span>
                </div>
              </div>

              <div className="each-count-box">
                <BadgeIcon sx={{ fontSize: "30px", color: "#7bc86f" }} className="count-icon" />
                <div className="count-details">
                  <h4>Completed Courses</h4>
                  <span>{completedCoursesCount}</span>
                </div>
              </div>

              <div className="each-count-box">
                <SchoolIcon sx={{ fontSize: "30px", color: "#1e92e0" }} className="count-icon" /> {/* Use any icon that fits */}
                <div className="count-details">
                  <h4>Custom Data</h4>
                  <span>{dashboardData.customValue}</span>
                </div>
              </div>
            </div>
            <div className="activity-map">
              <h3>Activity heat map</h3>
              <div
                style={{
                  backgroundColor: "var(--background)",
                  padding: "20px",
                  borderRadius: "5px",
                  border: "2px solid var(--border-color)",
                }}
              >
                <CalendarHeatmap
                  startDate={startDate}
                  endDate={endDate}
                  values={allDates}
                  classForValue={(value) => {
                    if (!value || value.count === -1) {
                      return "color-skipped"; // Special class for skipped dates (yellow)
                    } else if (value.count === 0) {
                      return "color-empty"; // No activity (light gray)
                    } else {
                      return `color-scale-${Math.min(value.count, 4)}`; // Assign color based on activity count
                    }
                  }}
                  tooltipDataAttrs={(value) => {
                    // Only show tooltip for valid dates
                    if (value.count !== -1) {
                      return {
                        "data-tip": `${value.date}: ${value.count} activity`,
                      };
                    }
                  }}
                  transformDayElement={(rect, value) => {
                    // Only show tooltip for valid dates
                    if (value && value.count !== -1) {
                      return (
                        <Tooltip
                          title={`${value.date}: ${value.count} activities`}
                          arrow
                          placement="top"
                          componentsProps={{
                            tooltip: {
                              sx: {
                                bgcolor: "#333",
                                color: "#fff",
                                fontSize: "12px",
                                p: "8px",
                                borderRadius: "4px",
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                                textAlign: "center",
                              },
                            },
                            arrow: {
                              sx: {
                                color: "#333",
                              },
                            },
                          }}
                        >
                          {rect}
                        </Tooltip>
                      );
                    }
                    return rect;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
