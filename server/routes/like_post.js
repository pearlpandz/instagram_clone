const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const Posts = require('../models/index'); //create new post schema

exports.likepost = function(req,res){
    console.log(req.body.post_id);
    console.log(req.body.current_userid);
    
    let post_id = req.body.post_id;
    let current_userid = req.body.current_userid;

    var query1 = {"_id": post_id};
    Posts.find(query1, function(err, post) { 
        if(err) {
          res.json(err);
        }
        else {
            console.log(post[0]);
            if(current_userid == post[0]['likeids']) {
                res.send({
                    status: false,
                    msg: 'already you liked',
                    likecount: post[0].likecount
                })
            }
            else {
                var query2 = {"_id": post_id};
                var update = {likecount: parseInt(post[0].likecount)+1, likeids: current_userid};
                var options = {new: true};
                Posts.findOneAndUpdate(query2, {$set:update}, options, function(err, post1) {
                    if (err) {
                        console.log('got an error');
                        res.send(err);
                    }
                    else {
                        console.log(post);
                        res.send({
                            status: true,
                            msg: 'you liked this post',
                            likeids: post1.likeids,
                            likecount: post1.likecount
                        }); 
                    }
                })
            }
        }  
    });

   


};