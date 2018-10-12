const mongoose = require('mongoose');

const newPostSchema = new mongoose.Schema({
    description: {type: String},
    location: {type: String},
    sampleFile: String,
    createdat: {type: String }
});

var posts = mongoose.model('posts', newPostSchema);

module.exports = posts;