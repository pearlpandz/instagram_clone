const mongoose = require('mongoose');

const newPostSchema = new mongoose.Schema({
    description: {type: String, required: true},
    location: {type: String},
    sampleFile: String

});

var posts = mongoose.model('posts', newPostSchema);


module.exports = posts;
