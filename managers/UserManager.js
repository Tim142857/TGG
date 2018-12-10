require('rootPath')();
const User = require('models/User')

var UserManager = {
  createUser: body => {
    return User.create({
      name: body.username,
      login: body.username,
      password: body.password
    })
  }
}

module.exports = UserManager;
