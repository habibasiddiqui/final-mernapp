const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Name is required']
    },
    pwd: {
        type: String,
        required: [true, 'Name is required']
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    role: {
        type: String
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User
