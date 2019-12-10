const User = require('../models/user.model');
const Depart = require('../models/depart.model');
const Docu = require('../models/document.model');
const Cat = require('../models/category.model');
const mongoose = require('mongoose');
const mailer = require('../config/mailer.config');


module.exports.index = (req, res, next) => {
  const departId = req.currentUser.depart
  Cat.find( {depart: departId} )
    .then( results => {
      const cats = []
      results.forEach( e => cats.push(e._id) )

      Docu.find( {category: {$in: cats} } )
        .populate('author')
        .populate('category')
        .limit(5)
        .sort( {createdAt: -1} )
        .then( docs => {
          res.render('users/index', {docs})
        })
        .catch(next)
    })
    .catch(next)
}

module.exports.adminIndex = (req, res, next) => {
  User.find({validated: false})
    .populate('depart')
    .then(users => {
      res.render('users/adminIndex', {users})
    }).catch(next)
}

module.exports.adminValidate = (req, res, next) => {
  const userId = req.params.userId
  User.findById(userId)
  .then( user => {
    if (user) {
      user.validated = true
      user.save()
      .then( () => {
        req.session.genericSuccess = 'User request was approved correctly'
        res.redirect('/admin/')
      })
      .catch(next)
    } else {
      req.session.genericError = 'User was not found'
      res.redirect('/admin/')
    }
  })
  .catch(next)
}

module.exports.adminDecline = (req, res, next) => {
  const userId = req.params.userId
  User.findByIdAndDelete(userId)
  .then( () => {
    req.session.genericSuccess = 'User request was declined correctly'
    res.redirect('/admin/')
  })
  .catch(next)
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
                req.session.genericError = "Wrong credentials or user not validated"
                res.redirect('/login')
              }
            })
        } else {
          req.session.genericError = "Wrong credentials or user not validated"
          res.redirect('/login')
        }
      })
      .catch(next)
  } else {
    req.session.genericError = "Wrong credentials or user not validated"
    res.redirect('/login')
  }

}

module.exports.new = (_, res) => {
  res.render('users/new')
}

module.exports.logOut = (req, res, next) => {
  req.session.destroy();
  res.redirect('/login');
}
