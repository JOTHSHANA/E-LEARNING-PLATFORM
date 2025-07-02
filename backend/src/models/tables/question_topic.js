const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const QTopic = sequelize.define(
    "QTopic",
    {
        id:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        languages:{
            type:DataTypes.STRING,
            allowNull:false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "1",
          },
    },
    {
        tableName: "question_topic",
        timestamps: false,
      }
)

module.exports = QTopic