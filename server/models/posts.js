const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    body: {
        type: String,
        required: [true, 'Body is required']
        
    },
    image: String,
    user: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        // default: new Date()
    }
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
