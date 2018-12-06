let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;


let TypeSoldier = sequelize.define('TypeSoldier', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    
    // TYPE <--

    // PLAYER -->
});