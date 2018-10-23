const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
const newPostSchema = new mongoose.Schema({
    description: {type: String},
    location: {type: String},
    sampleFile: [],
    createdat: {type: String },
    username: {type: String},
    profilepic: {type: String},
    userid: {type: String}
});

var posts = mongoose.model('posts', newPostSchema);

module.exports = posts;