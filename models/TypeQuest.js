let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;


let TypeBuilding = sequelize.define('TypeQuest', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name:{
      type: Sequelize.STRING,
      required: true,
    },
    xp:{
      type: Sequelize.INTEGER,
      required: true,
    },
    gold:{
      type: Sequelize.INTEGER,
      required: true,
    },
    duration:{
      type: Sequelize.DATE,
      required: true,
    },
    def:{
        type: Sequelize.INTEGER,
        required: true,
    },
});

  module.exports = TypeBuilding;