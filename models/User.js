let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;
const Building = require('models/Building');
const StockRessource = require('models/StockRessource');
const Squad = require('models/Squad');
const Hero = require('models/Hero');
const C = require('conf/constantes');

let User = sequelize.define('User', {
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
    defaultValue: false
  },
  ghost: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  coordX: {
    type: Sequelize.INTEGER,
    required: true
  },
  coordY: {
    type: Sequelize.INTEGER,
    required: true
  }
},
{
  freezeTableName: true,
  timestamps: true,
  defaultScope: {
    include: [
      { model: Building, as: 'buildings' },
      { model: StockRessource, as: 'stocks' },
      { model: Squad, as: 'squads' },
      { model: Hero, as: 'heroes' },
    ]
  },
  hooks: {
    afterFind: async function(user){
      if(user){
        user = user.updateStocksRessource();
        user = user.updateHeroes();
        return user;
      }
      return user;
    }
  }
});

User.prototype.updateHeroes = async function(){
  for(var i = 0; i < this.heroes.length; i++){
    let hero = this.heroes[i];

    var actualDate = new Date().getTime();
    var timeActualStatus = actualDate - hero.startDateStatus;

    if(hero.status === C.hero.status.ALIVE && hero.hp !== hero.hpMax){
      var newHp = timeActualStatus * hero.regen * hero.hpMax + hero.hp;
      hero.hp = newHp > hero.hpMax ? hero.hpMax : newHp;
      await hero.save();
    }

    //Traitement de fin de quete
    if(hero.quest && hero.quest.typeQuest.duration < timeActualStatus){
      var result = hero.getQuestResult();
      if(result.success){
        hero.hp = result.hpLeft;
        hero.status = C.hero.status.ALIVE;
        hero.xp = hero.xp + hero.quest.typeQuest.xp;
        hero.questId = null;
        let orStock = this.getStockRessourceByName('Or')
        orStock.value = orStock.value + hero.quest.typeQuest.gold;
        await Promise.all([
          hero.save(),
          orStock.save()
        ])
      } else {
        hero.die();
      }
    }

    if(hero.status === C.hero.status.DEAD && timeActualStatus > C.hero.timeHeroToRevive){
      hero.revive();
    }
    return this;
  }
}

//renvoit l'objet stock du nom de la ressource donnée du joueur
User.prototype.getStockByName = function(name){
  for(var i = 0; i < this.stocks.length; i++){
    if(this.stocks[i].ressource.name === name){
      return this.stocks[i];
    }
  }
}

//Met à jour les stocks du user et renvoit le user à jour
User.prototype.updateStocksRessource = function(){
  this.stocks.forEach(async(stock) => {
    var actualDate = new Date().getTime();
    let duration = actualDate - stock.updatedAt.getTime();
    var prod = this.getProdBuildByName(stock.ressource.name).getValue();
    let bonusProd = prod * duration / C.time.H;
    let newValue = stock.value + bonusProd;
    //Recuperation du maximum qu'on peut stocker
    var max = this.getStockageBuildByName(stock.ressource.name).getValue();
    stock.value = newValue > max ? max : newValue;
    stock = await stock.save()
  })
  return this;
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

//Prend en parametre le name d'une ressource(ex: "Or") et renvoit l'objet stock'
User.prototype.getStockRessourceByName = function(ressource){
  for(var i = 0; i < this.stocks.length; i++){
    if(this.stocks[i].ressource.name === ressource){
      return this.stocks[i]
    }
  }
}

//Renvoit l'objet Building de stockage du nom de la ressource donnée du joueur
User.prototype.getStockageBuildByName = function(name){
  for(var i = 0; i < this.buildings.length; i++){
    var actualBuildType = this.buildings[i].type;
    if(actualBuildType.ressource && actualBuildType.ressource.name === name && actualBuildType.functionBuilding.name === 'Stockage'){
      return this.buildings[i];
    }
  }
}





module.exports = User;
