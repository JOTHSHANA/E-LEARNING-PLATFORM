const User = require("./tables/users");
const Course = require("./tables/course");
const RegCourse = require("./tables/regCourse")
const Topic = require('./tables/topic')
const Content = require('./tables/contents')

// mapping - regCourse
User.hasMany(RegCourse, {foreignKey:'user'})
RegCourse.belongsTo(User,{foreignKey:'user'})
Course.hasMany(RegCourse,{foreignKey:'course'})
RegCourse.belongsTo(Course, {foreignKey:'course'})
//mapping-topic
Course.hasMany(Topic,{foreignKey:'course'})
Topic.belongsTo(Course, {foreignKey:'course'})
// mapping-content
Topic.hasMany(Content,{foreignKey:'topic'})
Content.belongsTo(Topic, {foreignKey:'topic'})

// exports
module.exports = {
    User,
    Course,
    RegCourse,
    Topic,
    Content
  };