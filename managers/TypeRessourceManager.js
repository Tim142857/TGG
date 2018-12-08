require('rootpath')();
const TypeRessource = require('models/TypeRessource')

var TypeRessourceManager = {
  create: body => {
    return TypeRessource.create({
      name: body.name,
      description: body.description,
      prod: body.prod,
      image: body.image
    })
  },
  edit: body => {
    return TypeRessource.findById(body.id)
    .then(typeRessourceToUpdate => {
      Object.assign(typeRessourceToUpdate, body)
      return typeRessourceToUpdate.save();
    })
  },
  findById: id=> {
    return TypeRessource.findById(id)
  },
  delete: id => {
    return TypeRessource.findById(id)
    .then( typeRessource => {
      typeRessource.destroy();
    })
  }
}

module.exports = TypeRessourceManager;
