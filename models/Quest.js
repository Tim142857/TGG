let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;
const TypeQuest = require('models/TypeQuest')

let Quest = sequelize.define('Quest', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
},
{
  freezeTableName: true,
  timestamps: true,
  defaultScope: {
    include: [
      { model: TypeQuest, as: 'typeQuest' },
    ]
  },
});

module.exports = Quest;
