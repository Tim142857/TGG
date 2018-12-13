require('rootPath')();
let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;
const TypeRessource = require('./TypeRessource');
const User = require('./User');

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

//mets a jour le stock en calculant la prod supplementaire depuis le updatedAt
StockRessource.prototype.selfUpdate = function(){
  console.log('selfUpdate')
  User.findByPk(this.userId)
  .then(user => {
    var prod = user.getProdBuildByName('Or');
    console.log(prod);
  })
  const duration = Date.now() - this.updatedAt;
  console.log('duration', duration);

}

module.exports = StockRessource;
