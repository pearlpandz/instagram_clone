const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const users = require('../models/user'); //create new post schema

const jwt = require('jsonwebtoken');
const config = require('./../common/config');

exports.adduser = function(req,res){

    if(req.body.profilepic){
        profilepic = req.body.profilepic;
    }
    else {
        profilepic = req.protocol + "://" + req.get('host') + '/uploads/noimage.png';
    }

    let user = new users ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profilepic: profilepic,
        createdat: new Date().toLocaleString()
      });

      users.findOne( {email: req.body.email}, function(err, data){
        if (err) { 
            res.send(err);
        }
        if (data) {
            res.json({ success: false, message: 'User Already Exist!' });
        } 
        else  {
            // console.log(req.body.name);
            // console.log('secret = ',config.secret, req.body.name)
            var token = jwt.sign({name:req.body.name}, config.secret, {
                expiresIn: 60*60*24 // expires in 24 hours
            });
            // console.log('created token', token);
            user.save(function(err,result){
                if(err){
                    res.send(err);
                }
                else {
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Successfully Signed Up',
                        token: token,
                        email: user.email,
                        name: user.name,
                        id: user.id,
                        profilepic: user.profilepic
                    });
                }
            }); 
            
          }
      });
};


const posts = require('../models/index'); //create new post schema
exports.getalluser = function(req,res){
    
    //get all the "feild: name" data from users table
    // .distinct("name") 
    posts.aggregate([
        {
            //it will group ther required fields in that record, You should provide your reference key in _id
            // $group: {_id: "$name", email : {$push: "$email" }  } 
            
            //it can remove or add required data in the record
            $unwind: "$comments",
            $match: {"_id": "5bd07ab1ba501f2accbd4c51"}
            // $project : [{ "$comments": 1 }],
            
            //it get data, which are perfectly matched
            // $match : { likecount : 0 },
            
            //it will show the given number of data (limit)
            // $limit: 2
        }
    ])
    .exec(function(err, user) { 
        if(err) {
            res.json(err);
        }
        else {
            res.send(user);
        }  
    });
};