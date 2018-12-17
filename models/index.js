const User = require('./User');
const Building = require('./Building');
const TypeBuilding = require('./TypeBuilding');
const TypeRessource = require('./TypeRessource');
const TypeSoldier = require('./TypeSoldier');
const TypeFunctionBuilding = require('./TypeFunctionBuilding');
const Squad = require('./Squad');
const Quest = require('./Quest');
const TypeQuest = require('./TypeQuest');
const StockRessource = require('./StockRessource');



let Models = {
  User,
  Building,
  TypeBuilding,
  TypeRessource,
  TypeSoldier,
  Squad,
  Quest,
  TypeQuest,
  TypeFunctionBuilding,
  StockRessource,
  TypeFunctionBuilding
}

//Relations
Building.belongsTo(TypeBuilding, { as: 'type' });
Building.belongsTo(User);
User.hasMany(Building, { as: 'buildings' });
TypeBuilding.belongsTo(TypeRessource, { as: 'ressource' });
TypeBuilding.belongsTo(TypeFunctionBuilding, { as: 'functionBuilding' });
TypeBuilding.belongsTo(TypeSoldier, { as: 'soldier' });
StockRessource.belongsTo(TypeRessource, { as: 'ressource' });
StockRessource.belongsTo(User);
User.hasMany(StockRessource, { as: 'stocks', hooks: true });
Squad.belongsTo(TypeSoldier);
Quest.belongsTo(TypeQuest);
Quest.belongsTo(User);
User.hasMany(Quest);

module.exports = Models;
