'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('courses', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      s_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      f_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      img: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rating:{
        type:Sequelize.DECIMAL(2,1),
        defaultValue:'1'
      },
      c_type:{
        type:Sequelize.ENUM('TECHNOLOGY','PROGRAMMING'),
        defaultValue:'PROGRAMMING',
      },
      status: {
        type: Sequelize.ENUM('0', '1'),
        defaultValue: '1',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('courses');
  }
};
