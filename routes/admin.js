var express = require('express');
var router = express.Router();
require('rootpath')();
var { User, TypeBuilding, TypeQuest, TypeRessource, TypeSoldier, TypeFunctionBuilding } = require('models')
var { TypeQuestManager, TypeBuildingManager, TypeRessourceManager, TypeSoldierManager, TypeFunctionBuildingManager } = require('managers')

router.get('/', function(req, res, next){
  res.locals.title = 'Accueil admin';
  res.render('admin/index', { layout: 'layoutAdmin' })
})

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
  Promise.all([
    TypeRessource.findAll(),
    TypeFunctionBuilding.findAll(),
    TypeSoldier.findAll(),
  ])
  .then(values => {
    res.render('admin/building/createBuilding', { ressources: values[0], functionBuildings: values[1], soldiers: values[2], layout: 'layoutAdmin' })
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
  Promise.all([
    TypeRessource.findAll(),
    TypeFunctionBuilding.findAll(),
    TypeSoldier.findAll()
  ])
  .then(values => {
    TypeBuildingManager.findById(id)
    .then(building => {
      res.locals.title = 'Editer Batiment';
      res.render("admin/building/createBuilding", { building, ressources: values[0], functionBuildings: values[1], soldiers: values[2], layout: 'layoutAdmin' })
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



/* -------------------------------------------- */

router.get('/soldier', function(req, res, next){
  res.locals.title = 'Soldier';
  res.render('admin/soldier/createSoldier', { layout: 'layoutAdmin' })
})
router.post('/soldier', function(req, res, next){
  TypeSoldierManager.create(req.body)
  .then(function(typeSoldier){
    res.redirect('/admin/soldiers');
  })
})

router.get('/soldiers', function(req, res, next){
  res.locals.title = 'Soldiers';
  TypeSoldier.findAll()
  .then(soldiers => {
    res.render ('admin/soldier/listSoldiers', { layout: 'layoutAdmin', soldiers })
  })
});

router.get('/deleteSoldier/:id', function(req, res, next){
  var id = req.params.id;
  TypeSoldierManager.findById(id)
  .then(soldier => {
    res.locals.title = 'Supprimer Soldier';
    res.render("admin/soldier/deleteSoldier", { soldier, layout: 'layoutAdmin' })
  })
})
router.post('/deleteSoldier/:id', function(req, res, next){
  var id = req.params.id;
  TypeSoldierManager.delete(id)
  .then(soldier => {
    res.redirect('/admin/soldiers')
  })
})

router.get('/editSoldier/:id', function(req, res, next){
  var id = req.params.id;
  TypeSoldierManager.findById(id)
  .then(soldier => {
    res.locals.title = 'Editer Soldier';
    res.render("admin/soldier/createSoldier", { soldier, layout: 'layoutAdmin' })
  })
})

router.post('/editSoldier', function(req, res, next){
  TypeSoldierManager.edit(req.body)
  .then(function(typeSoldier){
    res.redirect('/admin/soldiers')
  })
})

/* -------------------------------------------- */

router.get('/functionBuilding', function(req, res, next){
  res.locals.title = 'FunctionBuilding';
  res.render('admin/functionBuilding/createFunctionBuilding', { layout: 'layoutAdmin' })
})
router.post('/functionBuilding', function(req, res, next){
  TypeFunctionBuildingManager.create(req.body)
  .then(function(typeFunctionBuilding){
    res.redirect('/admin/functionBuildings');
  })
})

router.get('/functionBuildings', function(req, res, next){
  res.locals.title = 'FunctionBuildings';
  TypeFunctionBuilding.findAll()
  .then(functionBuildings => {
    res.render ('admin/functionBuilding/listFunctionBuildings', { layout: 'layoutAdmin', functionBuildings })
  })
});

router.get('/deleteFunctionBuilding/:id', function(req, res, next){
  var id = req.params.id;
  TypeFunctionBuildingManager.findById(id)
  .then(functionBuilding => {
    res.locals.title = 'Supprimer FunctionBuilding';
    res.render("admin/functionBuilding/deleteFunctionBuilding", { functionBuilding, layout: 'layoutAdmin' })
  })
})
router.post('/deleteFunctionBuilding/:id', function(req, res, next){
  var id = req.params.id;
  TypeFunctionBuildingManager.delete(id)
  .then(functionBuilding => {
    res.redirect('/admin/functionBuildings')
  })
})

router.get('/editFunctionBuilding/:id', function(req, res, next){
  var id = req.params.id;
  TypeFunctionBuildingManager.findById(id)
  .then(functionBuilding => {
    res.locals.title = 'Editer FunctionBuilding';
    res.render("admin/functionBuilding/createFunctionBuilding", { functionBuilding, layout: 'layoutAdmin' })
  })
})

router.post('/editFunctionBuilding', function(req, res, next){
  TypeFunctionBuildingManager.edit(req.body)
  .then(function(typeFunctionBuilding){
    res.redirect('/admin/functionBuildings')
  })
})




module.exports = router;
