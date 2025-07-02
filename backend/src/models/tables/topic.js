const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Course = require("./course");

const Topic = sequelize.define(
  "Topic",
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
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    image: {
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
    tableName: "c_topic",
    timestamps: false,
  }
);
module.exports = Topic;
