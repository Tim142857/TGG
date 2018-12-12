require('rootpath')();
const TypeBuilding = require('models/TypeBuilding')
const User = require('models/User')
const Building = require('models/Building')

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
  },
  createPlayerBuildings: idUser => {
    return Promise.all([
      TypeBuilding.find({ where: { name: 'Grenier' } }),
      TypeBuilding.find({ where: { name: 'Trésorerie' } }),
      TypeBuilding.find({ where: { name: 'Entrepot' } }),
      TypeBuilding.find({ where: { name: 'Ferme' } }),
      TypeBuilding.find({ where: { name: 'Mine' } }),
      TypeBuilding.find({ where: { name: 'Scierie' } }),
      TypeBuilding.find({ where: { name: 'Caserne' } }),
      TypeBuilding.find({ where: { name: 'Archerie' } }),
      TypeBuilding.find({ where: { name: 'Ecurie' } }),
      TypeBuilding.find({ where: { name: 'Atelier' } }),
      User.findByPk(idUser)

    ])
    .then(values => {
      var grenier = values[0];
      var tresorerie = values[1];
      var entrepot = values[2];
      var ferme = values[3];
      var mine = values[4];
      var scierie = values[5];
      var caserne = values[6];
      var archerie = values[7];
      var ecurie = values[8];
      var atelier = values[9];
      var user = values[10];

      var playerBuildings = [
        {
          typeId: grenier.id,
          level: 1,
          userId: user.id
        },
        {
          typeId: tresorerie.id,
          level: 1,
          userId: user.id
        },
        {
          typeId: entrepot.id,
          level: 1,
          userId: user.id
        },
        {
          typeId: ferme.id,
          level: 1,
          userId: user.id
        },
        {
          typeId: mine.id,
          level: 1,
          userId: user.id
        },
        {
          typeId: scierie.id,
          level: 1,
          userId: user.id
        },
        {
          typeId: caserne.id,
          level: 1,
          userId: user.id
        },
        {
          typeId: archerie.id,
          level: 1,
          userId: user.id
        },
        {
          typeId: ecurie.id,
          level: 1,
          userId: user.id
        },
        {
          typeId: atelier.id,
          level: 1,
          userId: user.id
        },
      ]
      return Building.bulkCreate(playerBuildings)
    })
  }
}

module.exports = TypeBuildingManager;
