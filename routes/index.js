var express = require('express');
var router = express.Router();
require('rootpath')();
var { User,TypeBuilding } = require('models')


/* GET home page. */
router.get('/', function(req, res, next) {
  test()
  .then(data => {
    console.log(data);
    res.send(data);
  })
});

module.exports = router;



function test(){
  return createTypeBuilding()
}

function createUser(){
  return User.create({
    name: 'Tim',
    login: 'login',
    password: '1234'
  })
}

function createTypeBuilding(){
  return TypeBuilding.create({
    name: 'neige',
    description: 'il fait froid',
    prod: 100,
  })
 }
