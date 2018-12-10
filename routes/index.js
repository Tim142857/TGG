var express = require('express');
var router = express.Router();
require('rootpath')();
var { User,TypeBuilding, TypeQuest} = require('models')
var { UserManager } = require('managers')
var isAuthenticated = require('connect-ensure-login').ensureLoggedIn();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.title = 'Accueil joueur'
  res.render('index', { layout: 'layout' })
});

router.get('/login',
function(req, res){
  res.locals.title = 'login'
  res.render('login');
});
router.post('/login',
passport.authenticate('local', { successRedirect: '/profile',
failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/admin/quests');
});

router.get('/register',
function(req, res){
  res.locals.title = "S'inscrire"
  res.render('register');
});
router.post('/register',
function(req, res) {
  UserManager.createUser(req.body)
  .then(user => {
    res.redirect('/');
  })
});

router.get('/logout',
function(req, res){
  res.locals.title = 'logout'
  req.logout();
  res.redirect('/');
});

router.get('/profile',
// require('connect-ensure-login').ensureLoggedIn(),
function(req, res){
  res.locals.title = 'profile'
  res.render('profile', { user: req.user });
});



module.exports = router;
