const mongoose = require('mongoose');
const Depart = require('../models/depart.model');
const Cat = require('../models/category.model');
const Docu = require('../models/document.model');
const User = require('../models/user.model');

module.exports.findDepartments = (req, res, next) => {
    
    if (req.currentUser.admin) {
        Depart.find()
        .then(results => {
            const departs = []
            results.forEach( e => departs.push(e) )
            res.json({departs})
        })
        .catch(next)
    } else {
        const departId = req.currentUser.depart
        Depart.find({_id: departId})
        .then(results => {
            const departs = []
            results.forEach( e => departs.push(e) )
            res.json({departs})
        })
        .catch(next)
    }
}