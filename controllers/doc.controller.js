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
    res.render('docs/form', { doc })
}

module.exports.create = (req, res, next) => {
    
    const newDocu = new Docu({
        title: req.body.title,
        content: req.body.content,
        files: req.file ? req.file.url : undefined,
        author: req.currentUser._id,
        depart: req.body.depart,
        category: req.body.category
    })
    newDocu.save()
    .then(() => {
        req.session.genericSuccess = 'Document saved!'
        res.redirect('/')
    })
    .catch(next)

}

module.exports.edit = (req, res, next) => {
    const docId = req.params.docId;
    console.log(docId)
    Docu.findById(docId)
    .then(doc =>  {
        if (doc) {
            res.render('docs/form', {doc})
        } else {
            req.genericError = 'Ups, document not found'
            res.redirect('/')
        }
    })
    .catch(next)
}

module.exports.show = (req, res, next) => {
    const docId = req.params.docId;
    
    Docu.findById(docId)
    .populate("depart")
    .populate("category")
    .then(doc =>  {
        if (doc) {
            console.log(doc)
            res.render('docs/view', {doc})
        } else {
            req.genericError = 'Ups, document not found'
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
            doc.depart = req.body.depart
            doc.category = req.body.category
            doc.save()
            .then(()=>{
                req.genericSuccess = 'Document modified!'
                res.redirect('/')
            })
            .catch(next)
        } else {
            req.genericError = `Ups, document couldn't be updated!`
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