require('roothPath')();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const User = require('models/User')

passport.use(new Strategy(
  function(name, password, cb) {
    console.log('iciiiiiiiiiiiiiiiiiiiiiiiiii')
    if (err) { return cb(err); }
    User.findOne({ where: {
      name,
      password
    }})
    .then(user => {
      if (!user) return cb(null, false);
      return cb(null, user);
    })
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });
