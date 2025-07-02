const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Topic = require("./topic");
const Course = require("./course");

const Content = sequelize.define(
  "Content",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    course: {
      type: DataTypes.BIGINT,
      references: {
        model: Course,
        key: "id",
      },
      allowNull: false,
    },
    topic: {
      type: DataTypes.BIGINT,
      references: {
        model: Topic,
        key: "id",
      },
      allowNull: false,
    },
    document: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    video: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sort_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "order",
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "1",
    },
  },
  {
    tableName: "c_content",
    timestamps: false,
  }
);

module.exports = Content;
