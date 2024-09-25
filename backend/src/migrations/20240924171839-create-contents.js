'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('c_content', {
      id:{
        type:Sequelize.BIGINT,
        autoIncrement:true,
        primaryKey:true
    },
    topic:{
        type:Sequelize.BIGINT,
        references:{
            model:Topic,
            key:'id',
        },
        allowNull:false 
    },
    document:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    image:{
        type:Sequelize.TEXT,
        allowNull:true
    },
    video:{
        type:Sequelize.TEXT,
        allowNull:true
    },
    order:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    status:{
        type:Sequelize.ENUM('0','1'),
        defaultValue:'1'
    }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('c_content');
  }
};
