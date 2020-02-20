const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    pw: {
        type: String
    },
    externalid: {
        type: String
    }
})

module.exports = mongoose.model('user', userSchema)