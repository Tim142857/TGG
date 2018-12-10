require('rootpath')();
const TypeSoldier = require('models/TypeSoldier')

console.log("typeSoldier");

var TypeSoldierManager = {
  create: body => {
    return TypeSoldier.create({
      name: body.name,
      description: body.description,
      atk : body.atk,
      def: body.def,
      cost: body.cost,
      image: body.image,
    })
  },
  edit: body => {
    return TypeSoldier.findById(body.id)
    .then(typeSoldierToUpdate => {
      Object.assign(typeSoldierToUpdate, body)
      return typeSoldierToUpdate.save();
    })
  },
  findById: id=> {
    return TypeSoldier.findById(id)
  },
  delete: id => {
    return TypeSoldier.findById(id)
    .then( typeSoldier => {
      typeSoldier.destroy();
    })
  }
}

module.exports = TypeSoldierManager;
