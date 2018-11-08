const mongoose = require('mongoose');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const newUserSchema = new mongoose.Schema({
    name: {type: String, index: true,  sparse: true, unique: true  },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {type: String},
    following: [],
    followers: [],
    blockids: [],
    profilepic: {type: String},
    createdat: {type: String },
    id: {type: String},
    provider: {type: String},
    username:  {type: String, index: true,  sparse: true },
    website: {type: String},
    bio: {type: String},
    phonenumber: {type: String},
    gender: {type: String},
    
    notification: [
        {   
            post_id: { type: String },
            liker_id: { type: String },
            action: { type: String },
        }
    ]
});

var users = mongoose.model('users', newUserSchema);

module.exports = users;