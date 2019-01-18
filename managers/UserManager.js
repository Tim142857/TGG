require('rootPath')();
const User = require('models/User')
const TypeBuildingManager = require('managers/TypeBuildingManager');
const StockRessourceManager = require('managers/StockRessourceManager')
const SquadManager = require('managers/SquadManager')
const HeroManager = require('managers/HeroManager')
const C = require('conf/constantes')

const xMax = C.map.width;
const yMax = C.map.height;

var UserManager = {
  createUser: body => {
    var coords = getRandomCoord();
    return User.create({
      name: body.username,
      login: body.username,
      password: body.password,
      coordX: coords.coordX,
      coordY: coords.coordY,
    })
    .then(user => {
      return Promise.all([
        TypeBuildingManager.createPlayerBuildings(user.id),
        StockRessourceManager.createPlayerStockRessources(user.id),
        SquadManager.createPlayerSquads(user.id),
        HeroManager.createPlayerHero(user.id)
      ])
    })
  }
}

async function getRandomCoord(){
  var sign, coordX, coordY, user;
  do {
    sign = Math.round(Math.random()) === 0 ? 1 : -1;
    coordX =  Math.floor(Math.random() * (xMax + 1)) * sign;
    sign = Math.round(Math.random()) === 0 ? 1 : -1;
    coordY = Math.floor(Math.random() * (yMax + 1)) * sign;
    user = await User.findOne({ where: {
      coordX,
      coordY
    } })
  } while(user)
  return { coordX, coordY }

}

module.exports = UserManager;
