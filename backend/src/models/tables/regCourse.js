const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require('./users')
const Course = require('./course')

const RegCourse = sequelize.define(
  "RegCourse",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user: {
        type:DataTypes.BIGINT,
        references:{
            model:User,
            key:'id',
        },
        allowNull:false,
    },
    course: {
        type:DataTypes.BIGINT,
        references:{
            model:Course,
            key:'id',
        },
        allowNull:false,
    },
    status: {
      type: DataTypes.ENUM("0", "1"),
      defaultValue: "1",
    },
  },
  { tableName: "reg_course", timestamps: false }
);

module.exports = RegCourse
