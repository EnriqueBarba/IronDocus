const mongoose = require('mongoose');
const Docu = require('../models/document.model');
const User = require('../models/user.model');
const Depart = require('../models/depart.model');
const Cat = require('../models/category.model');
const Comment = require('../models/comment.model');


module.exports.addComment = (req, res, next) => {
    const docId = req.params.docId
    const comment = new Comment({
      body: req.body.body,
      author  : req.currentUser._id,
      document: docId
    })
    
    comment.save()
      .then(c => {
        req.session.genericSuccess = 'comment created'
        res.redirect('/')
      })
      .catch((error) => {
        console.log(error)
        req.session.genericError = 'error creating comment'
        res.redirect('/')
      })
}

module.exports.showComments = (req, res, next) => {
  const docId = req.query.document;
  Comment.find({document:docId})
  .populate('author')
  .sort({createdAt: -1})
  .then(results => {
    const comments = []
    results.forEach( e => comments.push(e) )
    res.json({comments})
})
.catch(next)
}

module.exports.systemComment = (doc, user) => {
  User.findOne({admin:true})
  .then(admin => {
    if (admin){

      const edditedComment = new Comment({
        body:`Document <i>${doc.title}</i> has been modified by <i>${user.fullname}(${user.email})</i>`,
        author: admin._id,
        document: doc._id
      })

      edditedComment.save()
      .then(console.info)
      .catch(console.error)

    }else{
      console.log(`No admins found`)
    }
  })
  .catch(console.error)
}