let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;


let TypeRessource = sequelize.define('TypeResource', {
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
});

  module.exports = TypeRessource;