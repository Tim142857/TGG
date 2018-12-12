let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;
const TypeBuilding = require('models/TypeBuilding');

let Building = sequelize.define('Building', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  level: {
    type: Sequelize.STRING,
    required: true,
  },
},
{
  freezeTableName: true,
  timestamps: true,
  defaultScope: {
    include: [
      { model: TypeBuilding, as: 'type' }
    ]
  },
});

module.exports = Building;
