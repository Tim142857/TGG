require('rootPath')();
const User = require('models/User')
const TypeBuildingManager = require('managers/TypeBuildingManager');

var UserManager = {
  createUser: body => {
    return User.create({
      name: body.username,
      login: body.username,
      password: body.password
    })
    .then(user => {
      return TypeBuildingManager.createPlayerBuildings(user.id)
    })
  }
}

module.exports = UserManager;
