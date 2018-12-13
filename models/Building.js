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

Building.prototype.getValue = function(){
  return this.level * this.type.value;
}
Building.prototype.getNextValue = function(){
  return (this.level + 1) * this.type.value;
}
Building.prototype.getCostNextLevel = function(){
  return Math.floor(this.level * this.level + 100);
}

module.exports = Building;
