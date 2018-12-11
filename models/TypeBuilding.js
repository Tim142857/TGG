let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;
let TypeRessource = require('./TypeRessource')
let TypeFunctionBuilding = require('./TypeFunctionBuilding')
let TypeSoldier = require('./TypeSoldier')

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
  value: {
    type: Sequelize.INTEGER,
    required: true,
  },
  image: {
    type: Sequelize.STRING,
    required: true,
  }
},
{
  freezeTableName: true,
  timestamps: true,
  defaultScope: {
    include: [
      { model: TypeRessource, as: 'ressource' },
      { model: TypeFunctionBuilding, as: 'functionBuilding' },
      { model: TypeSoldier, as: 'soldier' }
    ]
  },
});

module.exports = TypeBuilding;
