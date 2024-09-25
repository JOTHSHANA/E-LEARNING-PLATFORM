const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  s_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  f_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  img: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: '1'
  },
  status: {
    type: DataTypes.ENUM('0', '1'),
    defaultValue: '1',
  },
}, {
  tableName: 'courses',
  timestamps: false,
});

module.exports = Course;
