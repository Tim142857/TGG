require('rootPath')();
const User = require('models/User')

module.exports = (req, res, next) => {
  if(req.user){
    res.locals.user = req.user;
  }
  next();
}
