let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;


let Ressource = sequelize.define('Ressource', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // TYPE <--

  // PLAYER -->
});

module.exports = Ressource;
