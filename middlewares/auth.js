module.exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  };
  //a middleware that ensures that only logged-in users can access certain pages.