import React, { useState, useEffect } from "react";
import requestApi from "../../components/utils/axios";
import { Menu, MenuItem, Button, Typography } from "@mui/material";
import PostForm from "../../components/post/post";
import ReplyForm from "../../components/post/reply";
import CryptoJS from "crypto-js";
import Layout from "../../components/appLayout/Layout";
import "./Forum.css";
import SubdirectoryArrowLeftTwoToneIcon from '@mui/icons-material/SubdirectoryArrowLeftTwoTone'; import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';

function Forum() {
  return <Layout body={<Body />} />;
}

function Body() {
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showReplies, setShowReplies] = useState({});
  const [showPostForm, setShowPostForm] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const secretKey = import.meta.env.VITE_ENCRYPT_KEY;

  const user = localStorage.getItem("D!");
  const bytes = CryptoJS.AES.decrypt(user, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  const userId = decryptedData.id;

  // Fetch courses on load
  useEffect(() => {
    const getCourses = async () => {
      const response = await requestApi("GET", "/course-list", null);
      setCourses(response.data);
    };
    getCourses();
  }, []);

  // Fetch topics when a course is selected
  const handleCourseClick = async (event, course) => {
    setSelectedCourse(course);
    setSelectedTopic([]);
    setPosts([]);
    setAnchorEl(event.currentTarget);

    const response = await requestApi(
      "GET",
      `/c_topic?course=${course.id}`,
      null
    );
    setTopics(response.data);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Fetch posts when a topic is selected
  const handleTopicSelect = async (topic) => {
    setSelectedTopic(topic); // React state is asynchronous, so don't rely on selectedTopic right after this
    setAnchorEl(null);

    try {
      const { success, data } = await requestApi(
        "GET",
        `/posts/${selectedCourse?.id}/${topic?.id}`, // Use topic.id directly
        null
      );

      if (success) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };


  // Toggle replies visibility
  const toggleReplies = (postId) => {
    setShowReplies((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="forum-container">
      <div style={{ backgroundColor: "var(--background-1)", width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid var(--border-color)", position: "sticky", top: "5px", zIndex: "1" }}>
        <p style={{ fontWeight: "600", fontSize: "26px", textAlign: "center" }}>Discussion Forum</p>
        {/* Courses Display */}
        <div className="courses-select-container">
          {courses.map((course) => (
            <button
              key={course.id}
              className={`course-button ${selectedCourse?.id === course.id ? "selected" : ""}`}
              onClick={(event) => handleCourseClick(event, course)}
            >
              {course.name}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {topics.map((topic) => (
          <MenuItem
            key={topic.id}
            onClick={() => handleTopicSelect(topic)}
          >
            {topic.title}
          </MenuItem>
        ))}
      </Menu>

      {/* Display Message When No Course or Topic is Selected */}
      {!selectedCourse || !selectedTopic ? (
        <div className="no-selection-message">
          <p style={{ fontStyle: "italic", fontSize: "18px" }}>
            <span style={{ color: "red", marginRight: "5px" }}>*</span>Select a course and topic to display discussions.
          </p>
        </div>
      ) : (
        <div className="posts-section">
          {selectedTopic && (
            <span style={{ color: "var(--primary-color)" }}><b>{selectedTopic.title}</b></span>
          )}

          {posts.map((post) => (
            <div style={{ display: "flex" }}>
              <div key={post.id} className="post">
                {post.replies.length > 0 && (
                  <button
                    className="view-replies-btn"
                    onClick={() => toggleReplies(post.id)}
                  >
                    {showReplies[post.id] ? <>
                      <span style={{ marginLeft: "5px", color: "var(--text)" }}>Hide Replies</span>
                      <ExpandCircleDownIcon
                        style={{
                          transform: "rotate(180deg)",
                          transition: "transform 0.3s",
                          color: "var(--text)",
                        }}
                      />

                    </> : <>
                      <span style={{ marginLeft: "5px", color: "var(--text)" }}>View Replies</span>
                      <ExpandCircleDownIcon
                        style={{
                          transform: "rotate(0deg)",
                          transition: "transform 0.3s",
                          color: "var(--text)",
                        }}
                      />

                    </>}
                  </button>
                )}
                {/* Parent Post */}
                <p className="post-content">{post.content}</p>
                <span className="post-meta">
                  By {post.User?.name || "Unknown"} on {" "}
                  {new Date(post.createdAt).toLocaleString()}
                </span>
                <br />


                {/* Replies Section */}
                {showReplies[post.id] &&
                  post.replies.map((reply) => (
                    <div key={reply.id} className="reply">
                      <p className="reply-content">{reply.content}</p>
                      <span className="reply-meta">
                        By {reply.User?.name || "Unknown"} on {" "}
                        {new Date(reply.createdAt).toLocaleString()}
                      </span>
                      {/* <button
                        className="reply-btn"
                        onClick={() => setReplyTo(reply.id)}
                      >
                        <SubdirectoryArrowLeftTwoToneIcon sx={{ color: "var(--text)" }} />
                      </button> */}
                    </div>
                  ))}
              </div>
              <button
                className="reply-btn"
                onClick={() => setReplyTo(post.id)}
              >
                <SubdirectoryArrowLeftTwoToneIcon style={{ color: "var(--text)" }} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Display New Post Button Only When Necessary */}
      {selectedCourse && selectedTopic && (
        <div className="actions">
          <button
            className="new-post-btn"
            onClick={() => setShowPostForm(true)}
          >
            <ControlPointDuplicateIcon />NEW POST
          </button>
        </div>
      )}

      {/* Post Form Modal */}
      {showPostForm && (
        <PostForm
          courseId={selectedCourse.id}
          topicId={selectedTopic.id}
          userId={userId}
          onClose={() => setShowPostForm(false)}
          onPostAdded={() => {
            setShowPostForm(false);
            handleTopicSelect(selectedTopic); // Refetch posts for current topic
          }}
        />
      )}

      {/* Reply Form Modal */}
      {replyTo && (
        <ReplyForm
          courseId={selectedCourse.id}
          topicId={selectedTopic.id}
          parentId={replyTo}
          userId={userId}
          onClose={() => setReplyTo(null)}
          onReplyAdded={() => {
            setReplyTo(null);
            handleTopicSelect(selectedTopic); // Refetch posts for current topic
          }}
        />
      )}
    </div>
  );

}

export default Forum;
