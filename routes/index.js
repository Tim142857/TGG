var express = require('express');
var router = express.Router();
require('rootpath')();
var { User } = require('models')

/* GET home page. */
router.get('/', function(req, res, next) {
  test()
  .then(data => {
    res.send(data);
  })
});

module.exports = router;



function test(){
  return createUser()
}

function createUser(){
  return User.create({
    name: 'Tim',
    login: 'login',
    password: '1234'
  })
}
