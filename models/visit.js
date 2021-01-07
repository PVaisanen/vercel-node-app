const mongoose = require('mongoose')

const visitSchema = new mongoose.Schema({
    page:{
        type: String,
        required: true
    }, 
    counter: {
        type: Number,
        required: true
    }
})  

module.exports = mongoose.model('visit', visitSchema);