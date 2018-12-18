var express = require('express');
var router = express.Router();
require('rootpath')();
var { User,TypeBuilding, TypeQuest} = require('models')
var { UserManager, BuildingManager, SquadManager } = require('managers')
var isAuthenticated = require('middlewares/isLoggedIn');
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
router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info){
    // This is the default destination upon successful login.
    var redirectUrl = '/profile';

    if (!user) { return res.redirect('/'); }
    if (req.session.returnTo) {
      redirectUrl = req.session.returnTo;
      req.session.redirectUrl = null;
    }
    req.logIn(user, function(err){
      if (err) { return next(err); }
    });
    res.redirect(redirectUrl);
  })(req, res, next);
});

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

router.get('/production',
function(req, res){
  res.locals.title = 'Production'
  res.render('logged/production');
});

router.get('/army',
function(req, res){
  res.locals.title = 'Army'
  res.render('logged/army')
})

router.post('/build/levelUp',
function(req, res){
  BuildingManager.levelUp(req)
  .then(success => {
    res.redirect(req.body.redirectTo)
  })
})

router.post('/troups/train',
function(req, res){
  SquadManager.train(req)
  .then(success => {
    res.redirect(req.body.redirectTo)
  })
})



module.exports = router;
