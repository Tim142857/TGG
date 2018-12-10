let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;


let StockRessource = sequelize.define('StockRessource', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: Sequelize.INTEGER,
    required: true
  }
},
{
  freezeTableName: true,
  timestamps: true
});

module.exports = StockRessource;
