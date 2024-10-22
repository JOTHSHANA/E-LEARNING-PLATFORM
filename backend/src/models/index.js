const User = require("./tables/users");
const Course = require("./tables/course");
const RegCourse = require("./tables/regCourse")
const Topic = require('./tables/topic')
const Content = require('./tables/contents')
const QTopic = require('./tables/question_topic')
const Questions = require('./tables/questions')
const Language = require('./tables/language')

// mapping - regCourse
User.hasMany(RegCourse, {foreignKey:'user'})
RegCourse.belongsTo(User,{foreignKey:'user'})
Course.hasMany(RegCourse,{foreignKey:'course'})
RegCourse.belongsTo(Course, {foreignKey:'course'})

//mapping-topic
Course.hasMany(Topic,{foreignKey:'course'})
Topic.belongsTo(Course, {foreignKey:'course'})

// mapping-content
Course.hasMany(Content, {foreignKey:'course'})
Content.belongsTo(Course,{foreignKey:'course'})
Topic.hasMany(Content,{foreignKey:'topic'})
Content.belongsTo(Topic, {foreignKey:'topic'})

// question topic map
QTopic.hasMany(Questions, {foreignKey:'topic'})
Questions.belongsTo(QTopic, {foreignKey:'topic'})

// exports
module.exports = {
    User,
    Course,
    RegCourse,
    Topic,
    Content,
    QTopic, 
    Questions,
    Language
  };