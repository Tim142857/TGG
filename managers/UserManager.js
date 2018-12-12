require('rootPath')();
const User = require('models/User')
const TypeBuildingManager = require('managers/TypeBuildingManager');
const StockRessourceManager = require('managers/StockRessourceManager')

var UserManager = {
  createUser: body => {
    return User.create({
      name: body.username,
      login: body.username,
      password: body.password
    })
    .then(user => {
      return Promise.all([
        TypeBuildingManager.createPlayerBuildings(user.id),
        StockRessourceManager.createPlayerStockRessources(user.id)
        ])
    })


  }
}

module.exports = UserManager;
