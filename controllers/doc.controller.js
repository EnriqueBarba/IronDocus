const mongoose = require('mongoose');
const Docu = require('../models/document.model');
const User = require('../models/user.model');
const Depart = require('../models/depart.model');
const Cat = require('../models/category.model');
const multer = require('multer');
const upload = multer();
const mailer = require('../config/mailer.config');

module.exports.new = (req, res, next) => {
    const doc = new Docu();  
    res.render('docs/form', {doc})
}

module.exports.doNew = (req, res, next) => {
    //console.log(req.body)
    const newDocu = new Docu({
        title: req.body.title,
        content: req.body.content,
        files: req.file ? req.file.url : udnefined,
        author: req.currentUser._id,
        category: req.body.category
    })
    //console.log('Docu: '+ newDocu)
    newDocu.save()
    .then(() => {
        req.session.genericSuccess = 'Document saved!'
        res.redirect('/')
    })
    .catch(next)

}

module.exports.edit = (req, res, next) => {
    res.redirect('/')
}