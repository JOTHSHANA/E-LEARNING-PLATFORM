const User = require("./tables/users");
const Course = require("./tables/course");
const RegCourse = require("./tables/regCourse");
const Topic = require("./tables/topic");
const Content = require("./tables/contents");
const QTopic = require("./tables/question_topic");
const Questions = require("./tables/questions");
const Language = require("./tables/language");
const Post = require("./tables/posts"); // Import the Post model

// Mapping - regCourse
User.hasMany(RegCourse, { foreignKey: "user" });
RegCourse.belongsTo(User, { foreignKey: "user" });
Course.hasMany(RegCourse, { foreignKey: "course" });
RegCourse.belongsTo(Course, { foreignKey: "course" });

// Mapping - topic
Course.hasMany(Topic, { foreignKey: "course" });
Topic.belongsTo(Course, { foreignKey: "course" });

// Mapping - content
Course.hasMany(Content, { foreignKey: "course" });
Content.belongsTo(Course, { foreignKey: "course" });
Topic.hasMany(Content, { foreignKey: "topic" });
Content.belongsTo(Topic, { foreignKey: "topic" });

// Question topic map
QTopic.hasMany(Questions, { foreignKey: "topic" });
Questions.belongsTo(QTopic, { foreignKey: "topic" });

// Mapping - posts
User.hasMany(Post, { foreignKey: "user" });
Post.belongsTo(User, { foreignKey: "user" });

Course.hasMany(Post, { foreignKey: "course" });
Post.belongsTo(Course, { foreignKey: "course" });

Topic.hasMany(Post, { foreignKey: "topic" });
Post.belongsTo(Topic, { foreignKey: "topic" });

Post.hasMany(Post, { foreignKey: "parentId", as: "replies" }); 
Post.belongsTo(Post, { foreignKey: "parentId", as: "parentPost" }); 

// Exports
module.exports = {
  User,
  Course,
  RegCourse,
  Topic,
  Content,
  QTopic,
  Questions,
  Language,
  Post, // Export the Post model
};
