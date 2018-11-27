const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const Posts = require('../models/index'); //create new post schema

exports.getpost = function(req,res){
    Posts.find({}).sort('-createdat').exec(function(err, post) { 
      if(err) {
        res.json(err);
      }
      else {
        res.send(post);
      }  
    });
};
exports.singlepostsfter =  function(req,res, next)
{
  // console.log(req.body.id);
  Posts.findOne({_id: {$gt:(req.body.id) }}).sort({_id: 0 }).limit(1).exec(function(err1,post1){
    // console.log(post1);
if(err1){
  res.send('err',err1);
}else{
  res.send(post1);
}
  })
}
exports.singlepostsprevious =  function(req,res, next)
{
  // console.log(req.body.id);
  Posts.findOne({_id: {$lt:(req.body.id) }}).sort({_id: -1}).limit(1).exec(function(err2,post2){
    // console.log(post1);
if(err2){
  res.send('err',err2);
}else{
  res.send(post2);
}
  })
}