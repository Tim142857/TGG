require('rootPath')();
const Squad = require('models/Squad');
const User = require('models/User');

module.exports = {
  train: function(req){
    Squad.findOne({
      where: {

      }
    })
  }
}
