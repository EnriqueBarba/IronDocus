const User = require('../models/user.model');
const Depart = require('../models/depart.model');
const mongoose = require('mongoose');
const mailer = require('../config/mailer.config');


module.exports.index = (_, res) => {
  res.render('users/index')
}

module.exports.adminIndex = (req, res, next) => {
  User.find({validated: false})
    .populate('depart')
    .then(users => {
      res.render('users/adminIndex', {users})
    }).catch(next)
}

module.exports.login = (_, res) => {
  res.render('users/login')
}

module.exports.doLogin = (req, res, next) => {

  const { email, password } = req.body
  if (email && password) {
    User.findOne({ email, validated: true })
      .then(user => {
        if (user) {
          user.checkPassword(password)
            .then(match => {
              if (match) {
                req.session.user = user
                if (user.admin) {
                  res.redirect('/admin/')
                } else {
                  res.redirect('/')
                }
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

module.exports.logOut = (req, res, next) => {
  req.session.destroy();
  res.redirect('/login');
}
