require('rootpath')();
const TypeQuest = require('models/TypeQuest')

var TypeQuestManager = {
  create: typeQuest => {
    return TypeQuest.create(typeQuest)
  },
  edit: typeQuest => {
    return TypeQuest.findById(typeQuest.id)
    .then(typeQuestToUpdate => {
      //typeQuestToUpdate = typeQuest;
      typeQuestToUpdate.name = typeQuest.name
      typeQuestToUpdate.xp = typeQuest.xp
      typeQuestToUpdate.gold = typeQuest.gold
      typeQuestToUpdate.duration = typeQuest.duration
      typeQuestToUpdate.def = typeQuest.def
      return typeQuestToUpdate.save();
    })
  },
  findById: id=> {
    return TypeQuest.findById(id)
    }
}

module.exports = TypeQuestManager;

