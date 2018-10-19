const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const users = require('../models/user'); //create new post schema
const jwt = require('jsonwebtoken');
const config = require('./../common/config');

exports.adduser = function(req,res){

    let user = new users ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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
                        message: 'Enjoy your token!',
                        email: user.email,
                        token: token
                    });
                }
            }); 
            
          }
      });
};
