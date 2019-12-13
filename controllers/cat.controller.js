const mongoose = require('mongoose');
const Cat = require('../models/category.model');
const Docu = require('../models/document.model');
const User = require('../models/user.model');
const Depart = require('../models/depart.model');

module.exports.findCategories = (req, res, next) => {
    const departId = req.query.depId
    console.log('departID: ' +departId)
    Cat.find({depart: departId})
    .then(results => {
        const cats = []
        results.forEach( e => cats.push(e) )
        res.json({cats})
    })
    .catch(next)
    
}