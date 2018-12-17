require('rootPath')();
const C = require('conf/constantes')

module.exports = function(req, res, next){
  res.locals.C = C;
  next();
}
