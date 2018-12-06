var express = require('express');
var router = express.Router();
require('rootpath')();
var { User,TypeBuilding, TypeQuest} = require('models')


/* GET home page. */
router.get('/', function(req, res, next) {
  test()
  .then(data => {
    console.log(data);
    res.send(data);
  })
});



/* CREATE Quest */

router.get('/admin/quest', function(req, res, next){
  console.log("## Quete create ##")
  res.render('admin/quest/createQuest')
})

router.post('/admin/quest', function(req, res, next){
  TypeQuest.create({
    name: req.body.questName,
    xp: req.body.questXp,
    gold: req.body.questGold,
    duration: req.body.questDuration,
    def: req.body.questDef,
  })
  .then(function(typeQuest){
    res.redirect('/admin/quests')
  })
})

/* ---------------- */

/* AFFICHER Quest */

router.get('/admin/quests', function(req, res, next){
  TypeQuest.findAll()
  .then(quests => {
    console.log("## Quetes Affiche ##")
    res.render ('admin/quest/listQuests', { quests })
  })
});

/*-----------------------*/

router.get('/login', function(req, res, next) {
  res.render('index', {user:'toto' , title: 'test'})
});

router.get('/admin/quest', function(req, res, next) {
  //recuperation des quetes
  Quest.findAll()
  .then(quests => {
    console.log(quests)
    //res.render (listQuests, { quests })
  })

  //on passe les quetes a la vue
  //on renvoit la vue
  res.render('index', {user:'toto' , title: 'test'})
});

router.get('/admin/quete/edit/:id', function(req, res, next) {
  res.render('index', {user:'toto' , title: 'test'})
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
