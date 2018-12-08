require('rootpath')();
const TypeQuest = require('models/TypeQuest')

var TypeQuestManager = {
  create: body => {
    return TypeQuest.create({
      name: body.name,
      xp: body.xp,
      gold: body.gold,
      duration: body.duration,
      def: body.def,
      image: body.image
    })
  },
  edit: body => {
    return TypeQuest.findById(body.id)
    .then(typeQuestToUpdate => {
      Object.assign(typeQuestToUpdate, body)
      return typeQuestToUpdate.save();
    })
  },
  findById: id=> {
    return TypeQuest.findById(id)
  },
  delete: id => {
    return TypeQuest.findById(id)
    .then( typeQuest => {
      typeQuest.destroy();
    })
  }
}

module.exports = TypeQuestManager;
