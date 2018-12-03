

//find allpost
const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const Posts = require('../models/index'); //create new post schema
const users = require('../models/user'); //create new user schema
let countervalue = 0;
var arraylength = [];
exports.getpost = function (req, res) {
  Posts.find({}).sort('-createdat').exec(function (err, post) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(post);
    }
  });
};


//api for call post and user
exports.singlepostafter = function (req, res) {
  users.findOne({ _id: req.body.id }, function (err1, post1) {
    if (err1) {
      res.send('err')
    } else {
      console.log(arraylength.length);
      var spot_id = parseInt(req.body.indexid)
       arraylength = post1.postids;
      var query = post1.postids[spot_id + 1];
     
          increment(spot_id);
      
      Posts.findOne(query, function(err2, post2){

        if(err2){
          res.send(err2)
        }else{
          res.send(post2)
        }
      })
    
    }

  })
}

function increment(index) {

  index++;
}

function decrement(index){
  index--;
}

// api for call previous post
exports.singlepostsprevious =  function(req,res, next)
{
  users.findOne({ _id: req.body.id }, function (err1, post1) {
    if (err1) {
      res.send('err')
    } else {
      // res.send(post1)
      var spot_id = parseInt(req.body.indexid)
    
      var query = post1.postids[spot_id - 1];
      decrement(spot_id);
      // res.send(query );
      Posts.findOne(query, function(err2, post2){

        if(err2){
          res.send(err2)
        }else{
          res.send(post2)
        }
      })
    
    }

  })
}