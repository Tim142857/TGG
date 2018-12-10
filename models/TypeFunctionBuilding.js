let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;


let TypeFunctionBuilding = sequelize.define('TypeFunctionBuilding', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name:{
    type: Sequelize.STRING,
    required: true,
  }
},
{
  freezeTableName: true,
  timestamps: true
});

module.exports = TypeFunctionBuilding;
