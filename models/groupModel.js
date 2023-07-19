const mongoose = require('mongoose')

const Group = mongoose.model( 'Group', new mongoose.Schema({
    name: String,
    _id:Number,
    members:Array
}))

module.exports = Group