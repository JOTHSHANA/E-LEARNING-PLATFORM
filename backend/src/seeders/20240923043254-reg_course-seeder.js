'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('reg_course', [
      {
        user: 1,  
        course: 1,  
        status: '1',
      },
      {
        user: 2,  
        course: 2,  
        status: '1',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('reg_course', null, {});
  }
};
