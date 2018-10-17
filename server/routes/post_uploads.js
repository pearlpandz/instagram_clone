const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const Posts = require('../models/index'); //create new post schema

exports.upload = function(req,res){
    var receiveArrayFiles = req.files;
    var regularpath = [];

    for (var i =0; i < receiveArrayFiles.length; i++ ) {
      // console.log('--- ',receiveArrayFiles[i])
      regularpath.push(req.protocol + "://" + req.get('host') + '/' + receiveArrayFiles[i].path);
    }
    // console.log("array regular", regularpath);

    let posts = new Posts ({
      sampleFile: regularpath,
      createdat: new Date().toLocaleString()
    });
    let mangooseid = req.body._id;
  
    var query = {"_id": mangooseid};
    var update = {sampleFile: regularpath};
    var options = {new: true};
    Posts.findOneAndUpdate(query, {$set:{sampleFile:regularpath}}, options, function(err, post) {
      console.log('000000 = ',err, post)
      if (err) {
        console.log('got an error');
      }
      else {
        console.log(post);
        res.send(post); 
      }
    
    }); 
}