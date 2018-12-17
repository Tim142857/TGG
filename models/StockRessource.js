require('rootPath')();
let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;
const User = require('models/User')
const TypeSoldier = require('models/TypeSoldier')
const TypeRessource = require('./TypeRessource');
const C = require('conf/constantes')

let StockRessource = sequelize.define('StockRessource', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: Sequelize.FLOAT,
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
  }
});

//mets a jour le stock en calculant la prod supplementaire depuis le updatedAt et renvoit le nouvel objet stock
// StockRessource.prototype.selfUpdate = async function(){
//   //Recuperation des données du user
//   const User = require('models/User')
//   return User.findByPk(this.UserId)
//   .then(async(user) => {
//     //proportionnalité pour calculer combien a été produit depuis la derniere maj du stock
//     let duration = Date.now() - this.updatedAt;
//     var prod = user.getProdBuildByName(this.ressource.name).getValue();
//     let bonusProd = Math.floor(prod * duration / C.time.H);
//     let newValue = this.value + bonusProd;
//     //Recuperation du maximum qu'on peut stocker
//     var max = user.getStockageBuildByName(this.ressource.name).getValue();
//     this.value = newValue > max ? max : newValue;
//     //sauvegarde du nouveau stock
//     await this.save();
//     return this;
//   })
//
// }

module.exports = StockRessource;
