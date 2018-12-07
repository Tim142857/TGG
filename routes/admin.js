var express = require('express');
var router = express.Router();
require('rootpath')();
var { User,TypeBuilding, TypeQuest } = require('models')
var { TypeQuestManager } = require('managers')



router.get('/quest', function(req, res, next){
  res.locals = { title: 'Quete' };
  res.render('admin/quest/createQuest', { layout: 'layoutAdmin' })
})
router.post('/quest', function(req, res, next){
  res.locals = { title: 'Quete' };
  let typeQuest = {
    name: req.body.questName,
    xp: req.body.questXp,
    gold: req.body.questGold,
    duration: req.body.questDuration,
    def: req.body.questDef,
  }
  TypeQuestManager.create(typeQuest)
  .then(function(typeQuest){
    req.flash('info', 'infoooo')
    console.log(req.session);
    console.log('-----------------------------')
    console.log(res);
    res.redirect('/admin/quests')
  })
})

/* ---------------- */

/* AFFICHER Quest */

router.get('/quests', function(req, res, next){
  // res.locals = { title: 'Quetes', flashMessage: undefined };
  res.locals = { title: 'Quetes'};
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

router.get('/editQuest/:id', function(req, res, next){
  var id = req.params.id;
  TypeQuestManager.findById(id)
  .then(quest => {
    res.locals = { title: 'Editer'};
    res.render("admin/quest/createQuest", { quest })
  })
})

router.post('/editQuest/', function(req, res, next){
  res.locals = { title: 'Editer' };
  let typeQuest = {
    id: req.body.questId,
    name: req.body.questName,
    xp: req.body.questXp,
    gold: req.body.questGold,
    duration: req.body.questDuration,
    def: req.body.questDef,
  }
  TypeQuestManager.edit(typeQuest)
  .then(function(typeQuest){
    res.redirect('/admin/quests')
  })
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
