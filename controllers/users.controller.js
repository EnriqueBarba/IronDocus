const User = require('../models/user.model');
const mongoose = require('mongoose');
const mailer = require('../config/mailer.config');


module.exports.index = (_, res) => {
  res.redirect('/user/index')
}

module.exports.adminIndex = (_, res) => {
  res.redirect('/user/adminIndex')
}

module.exports.login = (_, res) => {
  res.render('users/login')
}

module.exports.doLogin = (_, res) => {

  const { email, password } = req.body
  if (email && password) {
    User.findOne({ email, validated: true })
      .then(user => {
        if (user) {
          user.checkPassword(password)
            .then(match => {
              if (match) {
                req.session.user = user
                res.redirect('/')
              } else {
                req.session.genericError = "Wrong credentials"
                res.redirect('/login')
              }
            })
        }
      })
      .catch(next)
  } else {
    req.session.genericError = "Wrong credentials"
    res.redirect('/login')
  }

}
