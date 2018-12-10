let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;


let Building = sequelize.define('Building', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    primaryKey: true,
  },
  level:{
    type: Sequelize.STRING,
    required: true,
  },
},
{
  freezeTableName: true,
  timestamps: true
});

module.exports = Building;
