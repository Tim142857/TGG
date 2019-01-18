let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;
const TypeSoldier = require('models/TypeSoldier')


let Squad = sequelize.define('Squad', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  effective:{
    type: Sequelize.INTEGER,
    required: true,
  },
  isMoving: {
    type: Sequelize.BOOLEAN,
    required: true,
    defaultValue: false
  }
},
{
  freezeTableName: true,
  timestamps: true,
  defaultScope: {
    include: [
      { model: TypeSoldier }
    ]
  },
});

Squad.prototype.getCostTraining = function(nb){
  return this.TypeSoldier.cost * nb;
}

module.exports = Squad;
