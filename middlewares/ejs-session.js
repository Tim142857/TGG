module.exports = (req, res, next) => {
  // console.log('ici')
  // console.log(req.session)
  // console.log(req.user)
  console.log(req.session)
  if( req.user) res.locals.user = req.user;
  next();
}
