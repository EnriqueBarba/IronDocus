const mongoose = require('mongoose');
const Docu = require('../models/document.model');
const User = require('../models/user.model');
const Depart = require('../models/depart.model');
const Cat = require('../models/category.model');
const multer = require('multer');
const upload = multer();
const mailController = require('../controllers/mailer.controller')

module.exports.new = (req, res, next) => {
    const doc = new Docu();
    res.render('docs/form', { doc })
}

module.exports.create = (req, res, next) => {
    
    const newDocu = new Docu({
        title: req.body.title,
        content: req.body.content,
        contentHtml: req.body.contentHtml,
        files: req.file ? req.file.url : undefined,
        author: req.currentUser._id,
        depart: req.body.depart,
        category: req.body.category
    })
    newDocu.save()
    .then( doc => {
        //mailController.sendNewDocMail(['ebae1991@gmail.com'], req.currentUser.fullname, doc.title)
        req.session.genericSuccess = 'Document saved!'
        res.redirect('/')
    })
    .catch(err => {
        req.session.genericError = err.message
        res.redirect('/')
    })

}

module.exports.edit = (req, res, next) => {
    const docId = req.params.docId;
    Docu.findById(docId)
    .then(doc =>  {
        if (doc) {
            res.render('docs/form', {doc})
        } else {
            req.session.genericError = 'Ups, document not found'
            res.redirect('/')
        }
    })
    .catch(err => {
        req.session.genericError = err.message
        res.redirect('/')
    })
}

module.exports.show = (req, res, next) => {
    const docId = req.params.docId;
    
    Docu.findById(docId)
    .then(doc =>  {
        if (doc) {
            res.render('docs/view', {doc})
        } else {
            req.session.genericError = 'Ups, document not found'
            res.redirect('/')
        }
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
    const docId = req.params.docId;
    Docu.findById(docId)
    .then(doc =>  {
        if (doc) {
            doc.title = req.body.title
            doc.content = req.body.content
            doc.contentHtml = req.body.contentHtml
            doc.depart = req.body.depart
            doc.category = req.body.category
            doc.save()
            .then(()=>{
                req.session.genericSuccess = 'Document modified!'
                res.redirect('/')
            })
            .catch(err => {
                req.session.genericError = err.message
                res.redirect('/')
            })
        } else {
            req.session.genericError = `Ups, document couldn't be updated!`
            res.redirect('/')
        }
    })
    .catch(next)
}

module.exports.findByCat = (req, res, next) => {
    const catFlag = req.params.catFlag
    Cat.findOne({ flag: catFlag })
        .then(cat => {
            if (cat) {
                Docu.find({ category: cat._id })
                    .populate('author')
                    .populate('category')
                    .sort({ createdAt: -1 })
                    .then(docs => {
                        res.render('cat/cat', { docs })
                    })
                    .catch(next)
            }
        })
        .catch(next)
}