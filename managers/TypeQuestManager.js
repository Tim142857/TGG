require('rootpath')();
const TypeQuest = require('models/TypeQuest')

var TypeQuestManager = {
  create: typeQuest => {
    return TypeQuest.create(typeQuest)
  }
}

module.exports = TypeQuestManager;
