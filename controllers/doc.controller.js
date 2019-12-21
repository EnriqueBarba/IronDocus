const mongoose = require('mongoose');
const Docu = require('../models/document.model');
const User = require('../models/user.model');
const Depart = require('../models/depart.model');
const Cat = require('../models/category.model');
const Comment = require('../models/comment.model');
const multer = require('multer');
const upload = multer();
const mailController = require('../controllers/mailer.controller')
const comController = require('../controllers/comments.controller')

module.exports.new = (req, res, next) => {
    const doc = new Docu();
    res.render('docs/form', { doc })
}

module.exports.create = (req, res, next) => {
    
    const newDocu = new Docu({
        title: req.body.title,
        content: req.body.content,
        contentHtml: req.body.contentHtml,
        files: req.file ? [req.file.url] : [''],
        author: req.currentUser._id,
        depart: req.body.depart,
        category: req.body.category
    })
    newDocu.save()
    .then( doc => {
        mailController.sendNewDocMail(['irondocus@gmail.com'], req.currentUser.fullname, doc.title)
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
    .populate("depart")
    .populate("category")
    .then(doc =>  {
        if (doc) {
            res.render('docs/view', {doc})
        } else {
            req.session.genericError = 'Ups, document not found'
            res.redirect('/')
        }
    })
    .catch(err =>{
        req.session.genericError = err.message
        res.redirect('/')
    })
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
            if (req.file) {
                console.log(req)
                doc.files = [...doc.files, req.file.url]
            }
            doc.save()
            .then((doc)=>{
                mailController.sendModDocMail(['irondocus@gmail.com'], req.currentUser.fullname, doc.title)
                comController.systemComment(doc, req.currentUser)
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

module.exports.search = (req, res, next) => {

    const criteria = req.body.title
    ? {
      title: new RegExp(req.body.title, "i")
    }
    : {}

    Docu.find(criteria)
        .populate("author")
        .populate("category")
        .then(docs =>  {
            if (docs) {
                res.render('cat/cat', {docs})
            } else {
                req.session.genericError = 'Ups, document not found'
                res.redirect('/')
            }
    })
    .catch(err =>{
        req.session.genericError = err.message
        res.redirect('/')
    })
}