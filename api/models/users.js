const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: String,
    pwd: String
})

module.exports = mongoose.model('user', userSchema, 'users')