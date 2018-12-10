let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;

let User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name:{
    type: Sequelize.STRING,
    required: true
  },
  login: {
    type: Sequelize.STRING,
    required: true
  },
  password: {
    type: Sequelize.STRING,
    required: true
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultTo: false
  },
  ghost: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
},
{
  freezeTableName: true,
  timestamps: true
});





module.exports = User;
