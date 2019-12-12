const mongoose = require('mongoose');

const departSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Department name is required'],
        trim: true
    }, 
    flag:{
        type: String
    }
}, { timestamps: true })

const Depart = mongoose.model('Depart', departSchema);

module.exports = Depart;