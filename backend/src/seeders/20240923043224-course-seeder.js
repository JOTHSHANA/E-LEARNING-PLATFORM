'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('courses', [
      {
        name: 'Math 101',
        description: 'Basic mathematics course',
        img: 'math101.png',
        rating: 4.5,
        status: '1',
      },
      {
        name: 'Physics 201',
        description: 'Advanced physics course',
        img: 'physics201.png',
        rating: 4.8,
        status: '1',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('courses', null, {});
  }
};
