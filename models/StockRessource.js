let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;
const TypeRessource = require('models/TypeRessource');

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
  timestamps: true,
  defaultScope: {
    include: [
      { model: TypeRessource, as: 'ressource' }
    ]
  },
});

module.exports = StockRessource;
