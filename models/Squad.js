let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;


let Squad = sequelize.define('Squad', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    effective:{
      type: Sequelize.INTEGER,
      required: true,
    },
    
    // TYPE SOLDIER

    // RESOURCE
});

  module.exports = Squad;