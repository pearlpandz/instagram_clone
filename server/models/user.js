const mongoose = require('mongoose');
let softDelete = require('mongoosejs-soft-delete');
var mongoose_delete = require('mongoose-delete');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const newUserSchema = new mongoose.Schema({
    name: {type: String,  unique: true  },
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
    postids: [],
  resettoken : {type: String},
  token : {type : String},
  isVerified : Boolean,
 
    
    
    notification: [
        {   
            post_id: { type: String },
            liker_id: { type: String },
            action: { type: String },
        }
    ]
});


newUserSchema.plugin(softDelete);
var users = mongoose.model('users', newUserSchema);
module.exports = users;