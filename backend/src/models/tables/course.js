const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  course_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating:{
    type:DataTypes.ENUM('0','1','2','3','4','5'),
    defaultValue:'1'
  },
  status: {
    type: DataTypes.ENUM('0', '1'),
    defaultValue: '1',
  },
}, {
  tableName: 'courses',
  timestamps: true,
});

module.exports = Course;
