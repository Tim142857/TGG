const User = require('./User');
const Building = require('./Building');
const TypeBuilding = require('./TypeBuilding');
const TypeRessource = require('./TypeRessource');
const TypeSoldier = require('./TypeSoldier');
const Squad = require('./Squad');
const Army = require('./Army');
const Quest = require('./Quest');
const TypeQuest = require('./TypeQuest');



let Models = {
  User,
  Building,
  TypeBuilding,
  TypeRessource,
  TypeSoldier,
  Squad,
  Army,
  Quest,
  TypeQuest,
}

//Relations

module.exports = Models;
