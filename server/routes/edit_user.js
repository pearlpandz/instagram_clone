const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const users = require('../models/user'); //create new post schema

exports.create = function (req, res) {

    let query = {'_id': req.body.id};

    users.findByIdAndUpdate(query,
        { $set: {
            name: req.body.name,
             email: req.body.email,
            username: req.body.username,
             website: req.body.website,
             bio: req.body.bio,
             gender: req.body.gender,
             phonenumber: req.body.phonenumber
        }}, {new: true},
    
        function (err, post) {
            if (err) {
                res.send(err);
            } else {
console.log(post)
                res.send(post);
            }
        });



};