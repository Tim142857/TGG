var express = require('express');
var router = express.Router();
require('rootpath')();
var { User,TypeBuilding, TypeQuest} = require('models')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.title = 'Accueil joueur'
  res.render('index', { layout: 'layoutAdmin' })
});

router.get('/test', function(req, res, next) {
});






module.exports = router;



function test(){
  return createQuests()
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
