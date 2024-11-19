const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require('./users')
const Course = require('./course')
const Topic = require('./topic')

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    course: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: Course, 
          key: "id",
        },
      },
    topic: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Topic, 
        key: "id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "posts", 
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "posts",
    timestamps: true, 
  }
);

module.exports = Post;
