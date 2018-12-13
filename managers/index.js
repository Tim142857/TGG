const TypeQuestManager = require('./TypeQuestManager')
const TypeBuildingManager = require('./TypeBuildingManager')
const TypeRessourceManager = require('./TypeRessourceManager')
const TypeSoldierManager  = require('./TypeSoldierManager')
const TypeFunctionBuildingManager  = require('./TypeFunctionBuildingManager')
const BuildingManager  = require('./BuildingManager')
const UserManager = require('./UserManager')

var Managers = {
  TypeQuestManager,
  TypeBuildingManager,
  TypeRessourceManager,
  TypeSoldierManager,
  UserManager,
  TypeFunctionBuildingManager,
  BuildingManager
}

module.exports = Managers
