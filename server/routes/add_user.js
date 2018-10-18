const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const users = require('../models/user'); //create new post schema


exports.adduser = function(req,res){

    let user = new users ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        createdat: new Date().toLocaleString()
      });
    
      user.save(function(err,result){
          if(err){
              console.log(err);
          }
          else {
              res.json(result);
          }
      });  
      
};
