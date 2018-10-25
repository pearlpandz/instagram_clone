const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const users= require('../models/user'); //create new post schema


exports.follow = function (req, res) {
  console.log(req.body.user_id);
   console.log(req.body.follower_id);

let user_id = req.body.user_id;
let bulk = users.collection.initializeUnorderedBulkOp();
 
bulk.find({ 'users': user_id}).upsert().updateOne({
    $addToSet: {
        following: follower_id
    }
});

bulk.find({ 'users': follower_id}).upsert().updateOne({
    $addToSet: {
        followers: user_id
    }
})

bulk.execute(function(err, doc) {
    if (err) {
        return res.json({
            'state': false,
            'msg': err
        })
    }
    res.json({
        'state': true,
        'msg': 'Followed'
    })
});

   };



   