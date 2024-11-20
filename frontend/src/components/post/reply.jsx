import React, { useState } from "react";
import requestApi from "../utils/axios";

const ReplyForm = ({ parentId, userId, onClose, onReplyAdded }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, data } = await requestApi("POST", "/posts/reply", {
      userId,
      parentId,
      content,
    });

    if (success) {
      onReplyAdded(data.reply);
      onClose();
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your reply..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Reply</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ReplyForm;
