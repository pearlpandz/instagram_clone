const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const Posts = require('../models/index'); //create new post schema

exports.create = function(req, res) {

    var newPost = new Posts(req.body);
    console.log(newPost);
    newPost.save(function(err,result){
        if(err){
            console.log(err);
        }
        else {
            console.log(result['_id']);
            res.send({ id: result['_id'] });
        }
        
    });  
    
    
}