const mongoose = require('mongoose');

const departSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Department name is required'],
        trim: true
    }
}, { timestamps: true })

const Depart = mongoose.model('Depart', departSchema);

module.exports = Depart;