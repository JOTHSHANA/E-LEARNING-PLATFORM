import React, { useState } from "react";
import requestApi from "../utils/axios";

const PostForm = ({ courseId, topicId, userId, onClose, onPostAdded }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, data } = await requestApi("POST", "/posts/create", {
      userId,
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
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Post</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PostForm;
