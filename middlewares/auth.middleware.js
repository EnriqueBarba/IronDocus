module.exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      next()
    } else {
      req.session.genericError = 'User is not authenticated!'
      res.redirect('/login');
    }
  }

  module.exports.isAdmin = (req,res,next) => {
    if (req.session.user.admin) {
      next()
    } 
  }
  
  module.exports.isNotAuthenticated = (req, res, next) => {
    if (req.session.user) {
      res.redirect('/');
    } else {
      next()
    }
  }
  