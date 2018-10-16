const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const Posts = require('../models/index'); //create new post schema

exports.getpost = function(req,res){
    Posts.find({}).sort('-createdat').exec(function(err, docs) { 
      if(err) {
        res.json(err);
      }
      else {
        res.send(docs);
      }
     });
};