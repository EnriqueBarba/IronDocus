const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        minlength: [3, 'Category name needs at last 3 chars'],
        trim: true
    },
    depart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Depart',
        required: true
    }
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;