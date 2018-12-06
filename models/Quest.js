let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;


let Quest = sequelize.define('Quest', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    start: {
      type: Sequelize.BOOLEAN,
      required: true,
    }


    //TYPE QUEST

    // PLAYER


});

  module.exports = Quest;