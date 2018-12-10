require('rootpath')();
const TypeFunctionBuilding = require('models/TypeFunctionBuilding')

var TypeFunctionBuildingManager = {
  create: body => {
    return TypeFunctionBuilding.create({
      name: body.name
    })
  },
  edit: body => {
    return TypeFunctionBuilding.findById(body.id)
    .then(typeFunctionBuildingToUpdate => {
      Object.assign(typeFunctionBuildingToUpdate, body)
      return typeFunctionBuildingToUpdate.save();
    })
  },
  findById: id=> {
    return TypeFunctionBuilding.findById(id)
  },
  delete: id => {
    return TypeFunctionBuilding.findById(id)
    .then(typeFunctionBuilding => {
      typeFunctionBuilding.destroy();
    })
  }
}

module.exports = TypeFunctionBuildingManager;
