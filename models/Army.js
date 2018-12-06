let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;


let Army = sequelize.define('Army', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    
    // PLAYER
});

  module.exports = Army;