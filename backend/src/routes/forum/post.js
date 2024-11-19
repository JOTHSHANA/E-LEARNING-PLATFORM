const express = require("express");
const router = express.Router();
const postController = require("../../controllers/forum/post");

// Routes
router.post("/create", postController.createPost); 
router.get("/:courseId/:topicId", postController.getPostsByTopic); 
router.get("/replies/:postId", postController.getReplies);

module.exports = router;
