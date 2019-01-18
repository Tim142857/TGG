require('rootPath')();
let Sequelize = require('sequelize');
let sequelize = require('./config').sequelize;
const Quest = require('models/Quest');
const C = require('conf/constantes')


let Hero = sequelize.define('Hero', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    required: true,
  },
  xp: {
    type: Sequelize.INTEGER,
    required: true,
    defaultValue: 0
  },
  hp: {
    type: Sequelize.INTEGER,
    required: true,
    defaultValue: 100
  },
  hpMax: {
    type: Sequelize.INTEGER,
    required: true,
    defaultValue: 100
  },
  status: {
    type: Sequelize.ENUM('DEAD', 'ALIVE', 'IN QUEST'),
    required: true,
    defaultValue: 'Alive'
  },
  startDateStatus: {
    type: Sequelize.DATE,
    required: true,
    defaultValue: Sequelize.fn('NOW')
  },
  regen: {
    type: Sequelize.FLOAT,
    required: true,
    defaultValue: 10 / (C.time.H * 100) // regen de 10% par heure
  },
  crit: {
    type: Sequelize.INTEGER,
    required: true,
    defaultValue: 10 / 100 // 10% de chance de critique. Critique = double degats
  },
  dodge: {
    type: Sequelize.INTEGER,
    required: true,
    defaultValue: 5 / 100 // regen de 10% par heure
  },

},
{
  freezeTableName: true,
  timestamps: true,
  defaultScope: {
    include: [
      { model: Quest, as: 'quest' },
    ]
  },
});

Hero.prototype.getLevel = function(){
  return Math.floor(this.xp / 100) + 1;
}
Hero.prototype.getAtk = function(){
  return this.getLevel() * 150;
}
Hero.prototype.getDef = function(){
  return this.getLevel() * 150;
}
//Check if quest is won and how hp left on hero
Hero.prototype.getQuestResult = function(){
  if(this.getAtk() < this.quest.typeQuest.def){
    return { success: false, hpLeft: 0 }
  } else {
    let hpLost = Math.floor(Math.pow((this.quest.typeQuest.def / this.getAtk()), 3/2) * this.hpMax);
    let hpLeft = this.hp - hpLost;
    if(hpLeft <= 0) return { success: false, hpLeft: 0 }
    return { success: true, hpLeft }
  }
}
Hero.prototype.die = async function(){
  this.hp = 0;
  this.status = C.hero.status.DEAD;
  this.startDateStatus = new Date().getTime();
  this.questId = null;
  await this.save()
}
Hero.prototype.revive = async function(){
  this.hp = this.hpMax;
  this.status = C.hero.status.ALIVE;
  this.startDateStatus = new Date().getTime();
  await this.save()
}

module.exports = Hero;
