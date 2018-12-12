module.exports = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
  return next();
  req.session.redirectUrl = req.url;

  req.flash("warn", "You must be logged in to do that")
  res.redirect('/login');
}
