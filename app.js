require('rootPath')();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session')
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var User = require('models/User')
var ejsSession = require('middlewares/ejs-session')

passport.use('local', new Strategy(
  function(name, password, cb) {
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
    User.findById(id)
    .then(id, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });


  var indexRouter = require('./routes/index');
  var usersRouter = require('./routes/users');
  var adminRouter = require('./routes/admin');

  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.disable('view cache');
  app.use(expressLayouts);
  app.set('layout extractScripts', true)
  app.set('layout extractStyles', true)

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(ejsSession);

  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/admin', adminRouter);


  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    res.locals.title = '404';
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.title = 'Error';
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  module.exports = app;
