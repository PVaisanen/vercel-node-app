const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    playDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('player', playerSchema)