const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const Posts = require('../models/index'); //create new post schema
exports.exploreposts = function(req , res){
    var mysort = { likecount: -1 };
    Posts.find({}).sort(mysort).exec(function (err, post) {
        if (err) {
          res.json(err);
        }
        else {
          res.json({
            data: post
          });
        }
      });
    };
    