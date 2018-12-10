let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;


let Quest = sequelize.define('Quest', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  startDate: {
    type: Sequelize.DATE,
    required: true,
  }
},
{
  freezeTableName: true,
  timestamps: true
});

module.exports = Quest;
