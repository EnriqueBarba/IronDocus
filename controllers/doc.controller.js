const mongoose = require('mongoose');
const Docu = require('../models/document.model');
const User = require('../models/user.model');
const Depart = require('../models/depart.model');
const Cat = require('../models/category.model');
const mailer = require('../config/mailer.config');

module.exports.new = (req, res, next) => {
    const doc = new Docu();  
    res.render('docs/form', {doc})
}

module.exports.doNew = (req, res, next) => {
    res.redirect('/')
}

module.exports.edit = (req, res, next) => {
    res.redirect('/')
}