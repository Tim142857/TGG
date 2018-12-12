var express = require('express');
var router = express.Router();
require('rootpath')();
var { User,TypeBuilding, TypeQuest} = require('models')
var { UserManager } = require('managers')
var isAuthenticated = require('connect-ensure-login').ensureLoggedIn();
var passport = require('passport');

const PATH_TO_PUBLIC_LAYOUT = 'layouts/layoutPublic';


/* GET home page. */
router.get('/homepage', function(req, res, next) {
  res.locals.title = 'Accueil public'
  res.render('public/homepage', { layout: PATH_TO_PUBLIC_LAYOUT })
});

router.get('/login',
function(req, res){
  res.locals.title = 'login'
  res.render('public/login', { layout: PATH_TO_PUBLIC_LAYOUT });
});
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/profile' }));

router.get('/register',
function(req, res){
  res.locals.title = "S'inscrire"
  res.render('public/register', { layout: PATH_TO_PUBLIC_LAYOUT });
});
router.post('/register',
function(req, res) {
  UserManager.createUser(req.body)
  .then(user => {
    res.redirect('/profile');
  })
});

router.get('/logout',
function(req, res){
  res.locals.title = 'logout'
  req.logout();
  res.redirect('/homepage');
});



//Private routes
router.use(require('connect-ensure-login').ensureLoggedIn());

router.get('/profile',
function(req, res){
  res.locals.title = 'profile'
  res.render('logged/profile');
});

router.get('/storage',
function(req, res){
  res.locals.title = 'Stockage'
  res.render('logged/storage');
});




module.exports = router;
