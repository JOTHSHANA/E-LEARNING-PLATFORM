const { Post, User, Course, Topic } = require("../../models");

exports.createPost = async (req, res) => {
  const { userId, course, topic, content, parentId } = req.body;

  if (!userId || !content) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    let post;

    if (parentId) {
      post = await Post.create({
        userId,
        content,
        parentId, 
        course,
        topic,
      });
    } else {
      post = await Post.create({
        userId,
        course,
        topic,
        content,
        parentId: null, 
      });

      post.parentId = post.id;
      await post.save();
    }

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create post", error });
  }
};


const groupPosts = (posts) => {
  const grouped = [];
  const postMap = new Map();

  posts.forEach((post) => {
    const plainPost = post.get({ plain: true });
    if (plainPost.parentId === null || plainPost.parentId === plainPost.id) {
      const parentPost = { ...plainPost, replies: [] };
      grouped.push(parentPost);
      postMap.set(plainPost.id, parentPost);
    } else {
      const parent = postMap.get(plainPost.parentId);
      if (parent) {
        parent.replies.push(plainPost);
      } else {
        console.warn(`Parent not found for reply with ID: ${plainPost.id}`);
      }
    }
  });

  return grouped;
};


exports.getPostsByTopic = async (req, res) => {
  const { topicId, courseId } = req.params;

  try {
    const posts = await Post.findAll({
      where: { topic: topicId },
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
      order: [["createdAt", "ASC"]],
    });

    if (!posts.length) {
      return res
        .status(404)
        .json({ message: "No posts found for the given topic and course." });
    }

    // Group posts with replies
    const groupedPosts = groupPosts(posts);

    res.status(200).json({ posts: groupedPosts });
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
