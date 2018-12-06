let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;


let Building = sequelize.define('Building', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: false,
      primaryKey: true,
    },
    name:{
      type: Sequelize.STRING,
      required: true,
    },
    type:{
      type: Sequelize.STRING,
      required: true,
    },
    level:{
      type: Sequelize.STRING,
      required: true,
    },
    // PLAYER
});

  module.exports = Building;
