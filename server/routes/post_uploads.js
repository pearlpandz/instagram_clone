const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const Posts = require('../models/index'); //create new post schema

exports.upload = function(req,res){
    const uploadedFilePath = req.protocol + "://" + req.get('host') + '/' + req.file.path;
    var regularpath = uploadedFilePath.replace(/\\/g, "/");
    let posts = new Posts ({
      sampleFile: regularpath,
      createdat: new Date().toLocaleString()
    });
    let mangooseid = req.body._id;
  
    var query = {"_id": mangooseid};
    var update = {sampleFile: regularpath};
    var options = {new: true};
    Posts.findOneAndUpdate(query, update, options, function(err, post) {
      if (err) {
        console.log('got an error');
      }
      else {
        console.log(post);
        res.send(post);
      }
    
    }); 
}