const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [5, 'Title needs at last 5 chars'],
        trim: true
    },
    content: {
        type: String // TOREVIEW
    },
    files: {
        type: String // TOREVIEW
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true })

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;