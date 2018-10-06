const mongoose = require('mongoose');

const newPostSchema = new mongoose.Schema({
    location: {type: String, required: true},
    image: {type: String}
});

var posts = mongoose.model('posts', newPostSchema);


module.exports = posts;
