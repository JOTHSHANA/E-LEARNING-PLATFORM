import React, { useState } from "react";
import requestApi from "../utils/axios";

const ReplyForm = ({ parentId,courseId, topicId, userId, onClose, onReplyAdded }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, data } = await requestApi("POST", `/posts/create`, {
      userId,
      course:courseId,
      topic:topicId,
      content,
      parentId:parentId
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
