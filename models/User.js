let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;
const Building = require('models/Building');
const StockRessource = require('models/StockRessource');

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
  timestamps: true,
  defaultScope: {
    include: [
      { model: Building, as: 'buildings' },
      { model: StockRessource, as: 'stocks' }
    ]
  },
});

//renvoit l'objet stock du nom de la ressource donnée du joueur
User.prototype.getStockByName = function(name){
  for(var i = 0; i < this.stocks.length; i++){
    if(this.stocks[i].ressource.name === name){
      return this.stocks[i];
    }
  }
}

//Renvoit l'objet Building de stockage du nom de la ressource donnée du joueur
User.prototype.getStockageBuildByName = function(name){
  for(var i = 0; i < this.buildings.length; i++){
    var actualBuild = this.buildings[i].type;
    if(actualBuild.ressource && actualBuild.ressource.name === name && actualBuild.functionBuilding.name === 'Stockage'){
      return this.buildings[i];
    }
  }
}

//Renvoit l'objet Building de production du nom de la ressource donnée du joueur
User.prototype.getProdBuildByName = function(name){
  for(var i = 0; i < this.buildings.length; i++){
    var actualBuild = this.buildings[i].type;
    if(actualBuild.ressource && actualBuild.ressource.name === name && actualBuild.functionBuilding.name === 'Production'){
      return this.buildings[i];
    }
  }
}

//Prend en paametre le name d'une ressource(ex: "Or") et renvoit le stock du joueur en integer
User.prototype.getStockRessourceValue = function(ressource){
  for(var i = 0; i < this.stocks.length; i++){
    if(this.stocks[i].ressource.name === ressource){
      return this.stocks[i]
    }
  }
}





module.exports = User;
