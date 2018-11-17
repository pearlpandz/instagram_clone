const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const users = require('../models/user'); //create new post schema
const posts =  require('../models/index') 
var bcrypt = require('bcrypt');
let salt= bcrypt.genSaltSync(8);
exports.changepwd  = function (req, res, next) {
//  oldpwd = req.body.oldpwd;
//  newpwd = req.body.newpwd;
// password = {'password':req.body.password}
// oldpass=  {'password': req.body.oldpass};
// newpass= {'password':req.body.newpass}
//  emails = req.body.emails;
 users.findOne({name: req.body.name}, function(err, user){
    //    console.log(oldpass);
    //    console.log(newpass);
    //   console.log(user.password);
   if ( bcrypt.compare(user.password == req.body.oldpass)){
          res.send('oldpass crct')
      }
     else{
               res.send("incorrect");
     }})
            // users.findOneAndUpdate( {'password': req.body.oldpass} , {
            //         $set: {
            //             password: req.body.newpass
            //         }
            //     }, {new: true}, function(err1, user1) {
                    
            //         if(err1){
            //             res.send(err1);
            //         }
            //         else{
            //             res.send(user1);
            //         }
            //     }
            //     ) 
                  

     
//   }
     
        
    };
