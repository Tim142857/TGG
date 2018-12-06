let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;


let TypeSoldier = sequelize.define('TypeSoldier', {
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
    atk:{
      type: Sequelize.INTEGER,
      required: true,
    },
    def:{
      type: Sequelize.INTEGER,
      required: true,
    },
    cost:{
      type: Sequelize.INTEGER,
      required: true,
    },
    // SQUAD
});

  module.exports = TypeSoldier;