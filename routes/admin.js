var express = require('express');
var router = express.Router();
require('rootpath')();
var { User,TypeBuilding, TypeQuest} = require('models')

/* CREATE Quest */

router.get('/quest', function(req, res, next){
  console.log("## Quete create ##")
  res.locals = { title: 'Quete' };
  res.render('admin/quest/createQuest', { layout: 'layoutAdmin' })
})

router.post('/quest', function(req, res, next){
  res.locals = { title: 'Quete' };
  //TODO appeler plutot la methode TypeQuesController et y placer le .create()
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

router.get('/quests', function(req, res, next){
  res.locals = { title: 'Quetes' };
  TypeQuest.findAll()
  .then(quests => {
    console.log("## Quetes Affiche ##")
    res.render ('admin/quest/listQuests', { layout: 'layoutAdmin', quests })
  })
});

/*-----------------------*/

/* SUPPRIMER Quest */

router.post('/deleteQuest', function(req, res, next){
  //TypeQuest.destroy()
})

/*------------------------*/

/* MODIFIER Quest */

router.get('/modifyQuest', function(req, res, next){
  //Supprime les données de la quete a supprimer
})

router.post('/modifyQuest', function(req, res, next){
  //Recupere les données de la quete a modifier
})

/*---------------------------*/

router.get('/login', function(req, res, next) {
  res.render('index', {user:'toto' , title: 'test'})
});

router.get('/quest', function(req, res, next) {
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

router.get('/quete/edit/:id', function(req, res, next) {
  res.render('index', {user:'toto' , title: 'test'})
});

module.exports = router;
