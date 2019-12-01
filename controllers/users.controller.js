const User = require('../models/user.model');
const mongoose = require('mongoose');
const mailer = require('../config/mailer.config');

module.exports.login = (_, res) => {
    res.render('users/login')
  }