require('rootpath')();
const TypeBuilding = require('models/TypeBuilding')

var TypeBuildingManager = {
  create: body => {
    return TypeBuilding.create({
      name: body.name,
      description: body.description,
      prod: body.prod,
      image: body.image,
      ressourceId: body.ressourceId,
      functionBuildingId: body.functionBuildingId,
      soldierId: body.soldierId
    })
  },
  edit: body => {
    return TypeBuilding.findById(body.id)
    .then(typeBuildingToUpdate => {
      Object.assign(typeBuildingToUpdate, body)
      return typeBuildingToUpdate.save();
    })
  },
  findById: id=> {
    return TypeBuilding.findById(id)
  },
  delete: id => {
    return TypeBuilding.findById(id)
    .then( typeBuilding => {
      typeBuilding.destroy();
    })
  }
}

module.exports = TypeBuildingManager;
