const mongoose = require('mongoose')

const User = mongoose.model( 'User', new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    groups:Array
}))

module.exports = User