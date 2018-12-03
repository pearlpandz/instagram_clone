

//find allpost
const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const Posts = require('../models/index'); //create new post schema
const users = require('../models/user'); //create new user schema
let countervalue = 0;
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
      var spot_id = parseInt(req.body.indexid)
    
      var query = post1.postids[spot_id + 1];
      increment(spot_id);
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

function increment(index) {

  index++;
}


// api for call previous post
// exports.singlepostsprevious =  function(req,res, next)
// {
//   // console.log(req.body.id);
//   Posts.findOne({_id: {$lt:(req.body.id) }}).sort({_id: - 1}).limit(1).exec(function(err1,post1){
//     // console.log(post1);
// if(err1){
//   res.json({
//     data: err1,
//     msg : false
//   });
// }else{
//   if(req.body.userid == post1.userid){
//     // res.send(post1);
//     Posts.findOne({_id: {$lt:(req.body.id) }}).sort({_id: -1 }).limit(1).exec(function(err2,post2){
// if(err2){
//   res.json({data:err2,
//   message: false})
// }else{
//   res.json({data: post2})
// }  })
//  }else{
//    res.json({
//     data: post1._id,
//     message:'not a current user'});

// }
// }
//   })
// }