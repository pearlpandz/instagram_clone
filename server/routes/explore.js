const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const Posts = require('../models/index'); //create new post schema
exports.exploreposts = function(req , res){
   // var mysort = { likecount: -1 };
   // Posts.find({}).sort(mysort).exec(function (err, post) {
      Posts.find({}).exec(function (err, post) {
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
    
    
    exports.explorepostprevious = function (req, res, next) {
      try {
        Posts.findOne({ _id: { $lt: (req.body.id) } }).limit(1).exec(function (err2, previouspost) {
          if (err2) {
            res.send(err2)
          } else {
            res.send(previouspost)
          }
        })
      } catch (error) {
    
      }
    
    }
    exports.explorepostafter = function (req, res, next) {
      console.log(req.body.id)
      try {
        Posts.findOne({ _id: { $gt: (req.body.id) } }).limit(1).exec(function (err2, afterpost) {
          if (err2) {
            res.send(err2)
          } else {
            res.send(afterpost)
          }
        })
      } catch (error) {
    
      }
    
    }    