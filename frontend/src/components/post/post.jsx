import React, { useState } from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import requestApi from "../utils/axios";
import "./PostForm.css";

const PostForm = ({ courseId, topicId, userId, onClose, onPostAdded }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, data } = await requestApi("POST", "/posts/create", {
      user: userId,
      course: courseId,
      topic: topicId,
      content,
    });

    if (success) {
      onPostAdded(data.post);
      onClose();
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="post-form">
        <div className="textarea-container">
          <textarea
            className="post-textarea"
            placeholder="Write your post..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <IconButton
            type="submit"
            className="send-icon"
            aria-label="send post"
          >
            <SendIcon />
          </IconButton>
        </div>
      </form>
    </div>    
  );
};

export default PostForm;
