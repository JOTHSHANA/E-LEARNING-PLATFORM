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
            type:Sequelize.BIGINT,
            references:{
                model:User,
                key:'id',
            },
            allowNull:false,
        },
        course: {
            type:Sequelize.BIGINT,
            references:{
                model:Course,
                key:'id',
            },
            allowNull:false,
        },
        progress:{
          type:Sequelize.INTEGER,
          allowNull:false,
          defaultValue:50
        },
    
        status: {
          type: Sequelize.ENUM("0", "1"),
          defaultValue: "1",
        },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reg_course');
  }
};
