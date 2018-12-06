let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;


let TypeBuilding = sequelize.define('TypeBuilding', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name:{
      type: Sequelize.STRING,
      required: true,
    },
    description:{
      type: Sequelize.STRING,
      required: true,
    },
    prod:{
      type: Sequelize.INTEGER,
      required: true,
    },
    // RESOURCE
});

  module.exports = TypeBuilding;
