const User = require('./User');
const Building = require('./Building');
const TypeBuilding = require('./TypeBuilding');
const TypeRessource = require('./TypeRessource');
const TypeSoldier = require('./TypeSoldier');
const Squad = require('./Squad');
const Army = require('./Army');
const Quest = require('./Quest');
const TypeQuest = require('./TypeQuest');
const Ressource = require('./Ressource');



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
Building.belongsTo(TypeBuilding)
//Relation one-to-many: un TypeBuilding va etre relié a plusieurs instances de building qui référenceront ce typeBuilding
TypeBuilding.belongsTo(TypeRessource, {as: 'ressource'});
Ressource.belongsTo(TypeRessource);
Ressource.belongsTo(User);
User.hasMany(Ressource);
Squad.belongsTo(TypeSoldier);
Squad.belongsTo(Army);
Army.hasMany(Squad);
Quest.belongsTo(TypeQuest);
Quest.belongsTo(User);
User.hasMany(Quest)
module.exports = Models;
