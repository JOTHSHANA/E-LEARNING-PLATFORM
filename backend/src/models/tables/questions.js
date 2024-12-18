const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const QTopic = require ('./question_topic')


const Questions = sequelize.define(
    "Question",
    {
        id:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            primaryKey:true
        },
        topic:{
            type:DataTypes.BIGINT,
            references:{
                model:QTopic,
                key:'id'
            },
            allowNull:false
        },
        questions:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        question_query:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        difficulty:{
            type:DataTypes.ENUM("Easy","Medium","Hard"),
            defaultValue:"Easy"
        },
        t_case1:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        t_output1:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        t_case2:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        t_output2:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        t_case3:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        t_output3:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        t_case4:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        t_output4:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        t_case5:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        t_output5:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        status:{
            type:DataTypes.ENUM('0', '1'),
            defaultValue:'1'
        }
    },
    {tableName:"questions", timestamps:false}
)

module.exports = Questions