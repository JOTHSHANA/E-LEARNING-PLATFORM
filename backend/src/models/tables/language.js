const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Language = sequelize.define(
    "Language",
    {
        id:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        language:{
            type:DataTypes.STRING,
            allowNull:false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "1",
          },
    },
    {
        tableName: "language",
        timestamps: false,
      }
)

module.exports = Language