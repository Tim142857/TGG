var express = require('express');
var router = express.Router();
require('rootpath')();
var { User, TypeBuilding, TypeQuest, TypeRessource } = require('models')
var { TypeQuestManager, TypeBuildingManager, TypeRessourceManager } = require('managers')


router.get('/quest', function(req, res, next){
  res.locals.title = 'Quete';
  res.render('admin/quest/createQuest', { layout: 'layoutAdmin' })
})
router.post('/quest', function(req, res, next){
  TypeQuestManager.create(req.body)
  .then(function(typeQuest){
    res.redirect('/admin/quests');
  })
})

router.get('/quests', function(req, res, next){
  res.locals.title = 'Quetes';
  TypeQuest.findAll()
  .then(quests => {
    res.render ('admin/quest/listQuests', { layout: 'layoutAdmin', quests })
  })
});

router.get('/deleteQuest/:id', function(req, res, next){
  var id = req.params.id;
  TypeQuestManager.findById(id)
  .then(quest => {
    res.locals.title = 'Supprimer';
    res.render("admin/quest/deleteQuest", { quest, layout: 'layoutAdmin' })
  })
})
router.post('/deleteQuest/:id', function(req, res, next){
  var id = req.params.id;
  TypeQuestManager.delete(id)
  .then(quest => {
    res.redirect('/admin/quests')
  })
})

router.get('/editQuest/:id', function(req, res, next){
  var id = req.params.id;
  TypeQuestManager.findById(id)
  .then(quest => {
    res.locals.title = 'Editer';
    res.render("admin/quest/createQuest", { quest, layout: 'layoutAdmin' })
  })
})

router.post('/editQuest', function(req, res, next){
  TypeQuestManager.edit(req.body)
  .then(function(typeQuest){
    res.redirect('/admin/quests')
  })
})

// ----------------------------------------------------------

router.get('/building', function(req, res, next){
  res.locals.title = 'Batiment';
  TypeRessource.findAll()
  .then(ressources => {
    res.render('admin/building/createBuilding', { ressources, layout: 'layoutAdmin' })
  })
})
router.post('/building', function(req, res, next){
  TypeBuildingManager.create(req.body)
  .then(function(typeBuilding){
    res.redirect('/admin/buildings');
  })
})

router.get('/buildings', function(req, res, next){
  res.locals.title = 'Batiments';
  TypeBuilding.findAll()
  .then(buildings => {
    res.render ('admin/building/listBuildings', { layout: 'layoutAdmin', buildings })
  })
});

router.get('/deleteBuilding/:id', function(req, res, next){
  var id = req.params.id;
  TypeBuildingManager.findById(id)
  .then(building => {
    res.locals.title = 'Supprimer Batiment';
    res.render("admin/building/deleteBuilding", { building, layout: 'layoutAdmin' })
  })
})
router.post('/deleteBuilding/:id', function(req, res, next){
  var id = req.params.id;
  TypeBuildingManager.delete(id)
  .then(building => {
    res.redirect('/admin/buildings')
  })
})

router.get('/editBuilding/:id', function(req, res, next){
  var id = req.params.id;
  TypeRessource.findAll()
  .then(ressources => {
    TypeBuildingManager.findById(id)
    .then(building => {
      res.locals.title = 'Editer Batiment';
      res.render("admin/building/createBuilding", { building, ressources, layout: 'layoutAdmin' })
    })
  })
})

router.post('/editBuilding', function(req, res, next){
  TypeBuildingManager.edit(req.body)
  .then(function(typeBuilding){
    res.redirect('/admin/buildings')
  })
})

// ----------------------------------------------------------

router.get('/ressource', function(req, res, next){
  res.locals.title = 'Ressource';
  res.render('admin/ressource/createRessource', { layout: 'layoutAdmin' })
})
router.post('/ressource', function(req, res, next){
  TypeRessourceManager.create(req.body)
  .then(function(typeRessource){
    res.redirect('/admin/ressources');
  })
})

router.get('/ressources', function(req, res, next){
  res.locals.title = 'Ressources';
  TypeRessource.findAll()
  .then(ressources => {
    res.render ('admin/ressource/listRessources', { layout: 'layoutAdmin', ressources })
  })
});

router.get('/deleteRessource/:id', function(req, res, next){
  var id = req.params.id;
  TypeRessourceManager.findById(id)
  .then(ressource => {
    res.locals.title = 'Supprimer Ressource';
    res.render("admin/ressource/deleteRessource", { ressource, layout: 'layoutAdmin' })
  })
})
router.post('/deleteRessource/:id', function(req, res, next){
  var id = req.params.id;
  TypeRessourceManager.delete(id)
  .then(ressource => {
    res.redirect('/admin/ressources')
  })
})

router.get('/editRessource/:id', function(req, res, next){
  var id = req.params.id;
  TypeRessourceManager.findById(id)
  .then(ressource => {
    res.locals.title = 'Editer Ressource';
    res.render("admin/ressource/createRessource", { ressource, layout: 'layoutAdmin' })
  })
})

router.post('/editRessource', function(req, res, next){
  TypeRessourceManager.edit(req.body)
  .then(function(typeRessource){
    res.redirect('/admin/ressources')
  })
})

module.exports = router;
