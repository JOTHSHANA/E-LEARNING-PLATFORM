'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reg_course', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      user: {
        type: Sequelize.BIGINT,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      course: {
        type: Sequelize.BIGINT,
        references: {
          model: 'courses',
          key: 'id',
        },
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('0', '1'),
        defaultValue: '1',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reg_course');
  }
};
