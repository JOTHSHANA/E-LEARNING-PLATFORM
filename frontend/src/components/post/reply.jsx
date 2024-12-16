import React, { useState } from "react";
import requestApi from "../utils/axios";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./PostForm.css";



const ReplyForm = ({ parentId, courseId, topicId, userId, onClose, onReplyAdded }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, data } = await requestApi("POST", `/posts/create`, {
      userId,
      course: courseId,
      topic: topicId,
      content,
      parentId: parentId
    });

    if (success) {
      onReplyAdded(data.reply);
      onClose();
    }
  };

  return (
    <div className="modal">
      {/* <form onSubmit={handleSubmit}>
        <textarea
          style={{ width: "700px", padding: "10px", borderRadius: "10px", backgroundColor: "var(--background-1)", border: "1px solid var(--border-color)", position: "absolute", bottom: "10px", right: "25%" }}

          placeholder="Write your reply..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Reply</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form> */}




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

export default ReplyForm;
