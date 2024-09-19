const User = require("./tables/users");
const Course = require("./tables/course");
const RegCourse = require("./tables/regCourse")

// mapping - regCourse
User.hasMany(RegCourse, {foreignKey:'user'})
RegCourse.belongsTo(User,{foreignKey:'user'})
Course.hasMany(RegCourse,{foreignKey:'course'})
RegCourse.belongsTo(Course, {foreignKey:'course'})

// exports
module.exports = {
    User,
    Course,
    RegCourse
  };