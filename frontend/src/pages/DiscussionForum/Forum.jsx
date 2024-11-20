import React, { useState, useEffect } from "react";
import requestApi from "../../components/utils/axios";
import Select from "react-select";
import PostForm from "../../components/post/post";
import ReplyForm from "../../components/post/reply";
import CryptoJS from "crypto-js";
import "./Forum.css";

const Forum = () => {
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  const secretKey = import.meta.env.VITE_ENCRYPT_KEY;

  const user = localStorage.getItem("D!");
  const bytes = CryptoJS.AES.decrypt(user, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  const userId = decryptedData.id;

  // Fetch courses on load
  useEffect(() => {
    const getCourses = async () => {
      const response  = await requestApi("GET", "/course-list", null);
        const courseOptions = response.data.map((course) => ({
          value: course.id,
          label: course.name,
        }));
        setCourses(courseOptions);
      
    };
    getCourses();
  }, []);

  // Fetch topics when a course is selected
  const handleCourseChange = async (selectedOption) => {
    setSelectedCourse(selectedOption);
    setSelectedTopic(null); // Reset topic when course changes
    setPosts([]); // Clear posts when course changes

    const  response = await requestApi(
      "GET",
      `/c_topic?course=${selectedOption.value}`,
      null
    );
      const topicOptions = response.data.map((topic) => ({
        value: topic.id,
        label: topic.title,
      }));
      setTopics(topicOptions);
    
  };

  // Fetch posts when a topic is selected
  const handleTopicChange = async (selectedOption) => {
    setSelectedTopic(selectedOption);

    const { success, data } = await requestApi(
      "GET",
      `/posts/${selectedCourse.value}/${selectedOption.value}`,
      null
    );
    if (success) {
      setPosts(data.posts);
    }
  };

  return (
    <div className="forum-container">
      <h2>Discussion Forum</h2>
      <div className="dropdowns">
        <div className="dropdown-wrapper">
          <label>Select Course:</label>
          <Select
            options={courses}
            value={selectedCourse}
            onChange={handleCourseChange}
            placeholder="Choose a Course"
          />
        </div>

        <div className="dropdown-wrapper">
          <label>Select Topic:</label>
          <Select
            options={topics}
            value={selectedTopic}
            onChange={handleTopicChange}
            placeholder="Choose a Topic"
            isDisabled={!selectedCourse}
          />
        </div>
      </div>

      <div className="posts-section">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <p className="post-content">{post.content}</p>
            <span className="post-meta">
              By {post.User?.name || "Unknown"} on{" "}
              {new Date(post.createdAt).toLocaleString()}
            </span>
            <button
              className="reply-btn"
              onClick={() => setReplyTo(post.id)}
            >
              Reply
            </button>
          </div>
        ))}
      </div>

      <div className="actions">
        <button
          className="new-post-btn"
          onClick={() => setShowPostForm(true)}
          disabled={!selectedCourse || !selectedTopic} // Button only enabled if course and topic are selected
        >
          New Post
        </button>
      </div>

      {showPostForm && (
        <PostForm
          courseId={selectedCourse.value}
          topicId={selectedTopic.value}
          userId={userId}
          onClose={() => setShowPostForm(false)}
          onPostAdded={(newPost) => setPosts((prev) => [newPost, ...prev])}
        />
      )}

      {replyTo && (
        <ReplyForm
          parentId={replyTo}
          userId={userId}
          onClose={() => setReplyTo(null)}
          onReplyAdded={(newReply) => setPosts((prev) => [newReply, ...prev])}
        />
      )}
    </div>
  );
};

export default Forum;
