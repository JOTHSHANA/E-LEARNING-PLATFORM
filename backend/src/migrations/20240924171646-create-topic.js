'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('c_topic', {
      id:{
        type:Sequelize.BIGINT,
        autoIncrement:true,
        primaryKey:true
    },
    course:{
        type:Sequelize.BIGINT,
        references:{
            model:Course,
            key:'id',
        },
        allowNull:false
},
title:{
    type:Sequelize.STRING(255),
    allowNull:false
},
description:{
    type:Sequelize.STRING(255),
    allowNull:true,
},
image:{
    type:Sequelize.TEXT,
    allowNull:true,
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
    await queryInterface.dropTable('c_topic');
  }
};
