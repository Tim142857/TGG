require('rootPath')();
const Hero = require('models/Hero');
const User = require('models/User');
const Quest = require('models/Quest');
const C = require('conf/constantes')

module.exports = {
  createPlayerHero: async function(userId){
    return Hero.create({
      name: 'Hero',
      UserId: userId,
    })
  },
  sendToQuest: req => {
    //Evolution: recuperation du bon héros
    var hero = req.user.heroes[0];
    //check if hero alive and nt already in quest
    if(hero.quest === null && hero.status === C.hero.status.ALIVE){
      //Create Quest
      return Quest.create({
        typeQuestId: req.body.idQuest
      })
      .then(quest => {
        hero.status = C.hero.status.IN_QUEST;
        hero.startDateStatus = new Date().getTime();
        hero.questId = quest.id;
        return hero.save();
      })
    } else {

      return Promise.resolve();
    }
  }
}
