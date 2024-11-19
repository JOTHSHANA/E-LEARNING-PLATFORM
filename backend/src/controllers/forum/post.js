const { Post, User, Course, Topic } = require("../../models");

exports.createPost = async (req, res) => {
  const { userId, course, topic, content, parentId } = req.body;

  if (!userId || !course || !topic || !content) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const post = await Post.create({
      userId,
      course,
      topic,
      content,
      parentId: parentId || null,
    });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create post", error });
  }
};

exports.getPostsByTopic = async (req, res) => {
    const { topicId, courseId } = req.params; 
  
    try {
      const posts = await Post.findAll({
        where: { 
          topic: topicId, 
          parentId: null 
        },
        include: [
          {
            model: User,
            attributes: ["id", "name", "email"],
          },
          {
            model: Topic,
            where: { course: courseId },
            attributes: ["id", "title"],
            include: [
              {
                model: Course,
                attributes: ["id", "name"],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
  
      if (!posts.length) {
        return res.status(404).json({ message: "No posts found for the given topic and course." });
      }
  
      res.status(200).json({ posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch posts", error });
    }
  };
  

exports.getReplies = async (req, res) => {
  const { postId } = req.params;

  try {
    const replies = await Post.findAll({
      where: { parentId: postId },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json({ replies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch replies", error });
  }
};
