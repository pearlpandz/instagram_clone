const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const users = require('../models/user'); //create new post schema
const posts = require('../models/index'); //create new post schema
const jwt = require('jsonwebtoken');
const config = require('./../common/config');
const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
let salt= bcrypt.genSaltSync(8);

function isEmpty(req) {
    console.log(req);
    for (var key in req) {
        if (req.hasOwnProperty(key))
            return false;
    }
    return true;
}
//checking... Array targat
function checklikeid(array, target) {
    // console.log(array, target);
   // console.log(target);
    for (var i = 0; i < array.length; i++) {
        // console.log('array first element', array[0]);
        if (array[i] == target) {
           
            console.log('true');
            return true;
        }
    }
    console.log('false');
    return false;
}

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
        password: bcrypt.hashSync(req.body.password, salt),

        profilepic: profilepic,
        createdat: new Date().toLocaleString()
      });

      users.findOne( {email: req.body.email, name: req.body.name}, function(err, data){
        if (err) { 
            // res.send(err);
            console.log('some errror hapeens')
        }
        if (data) {
            res.json({ success: false, message: 'User Already Exist!' });
        } 
        else  {
            console.log(req.body.name);

            user.save(function(err,result){
                if(err){
                    console.log('err')
                    // res.send(err);
                    res.json({
                        success: false,
                        msg: 'change ur username'
                    })
                }
                else {
                    // console.log('secret = ',config.secret, req.body.name)
                    var token = jwt.sign({name: req.body.name}, config.secret, {
                        expiresIn: 60*60*24 // expires in 24 hours
                    });
                    console.log('created token', token);


                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Successfully Signed Up',
                        token: token,
                        email: user.email,
                        name: user.name,
                        id: user._id,
                        profilepic: user.profilepic
                    });
                }
            }); 
            
          }
      });
};


exports.socialuser = function(req,res){


let Userdata = new users ({
    name: req.body.name,
    email: req.body.email,
    profilepic: req.body.profilepic,
    provider: req.body.provider,
    createdat: new Date().toLocaleString()
  });

// console.log(Userdata);
    users.findOne( {email: req.body.email}, function(err, data){
        if (err) { 
            console.log('err');
            // res.send(err);
            res.json({
                success: false
            })

            
        }
        if (data) {
            
            if(req.body.provider==data.provider){
                // console.log('if');
                // console.log(req.body.name);
                // console.log('secret = ',config.secret, req.body.name)
                var token = jwt.sign({name:req.body.name}, config.secret, {
                    expiresIn: 60*60*24 // expires in 24 hours
                });
                
                res.json({
                    success: true,
                    message: 'Successfully Signed Up',
                    token: token,
                    email: data.email,
                    name: data.name,
                    id: data._id,
                    profilepic: data.profilepic
                });
            }
        } 
        else  {
            // console.log('else');
            // console.log(req.body.name);
            // console.log('secret = ',config.secret, req.body.name)
            var token = jwt.sign({name:req.body.name}, config.secret, {
                expiresIn: 60*60*24 // expires in 24 hours
            });
            // console.log('created token', token);
            Userdata.save(function(err,result){
                if(err){
                    res.json({

                        success: false,
                        msg: "signup with username name new"
                    });
                }
                else {
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Successfully Signed Up',
                        token: token,
                        email: result.email,
                        name: result.name,
                        id: result._id,
                        profilepic: result.profilepic
                    });
                }
            }); 
            
          }
    });
}
//set unique name for edituser

exports.editUniqueName = function(req, res){
// console.log(req.body);
users.findOne({name: req.body.name}, function(err,detail){


    if(isEmpty(detail)){
    //    console.log("no user like");
    users.distinct(req.body.name, function(err,names){

        // console.log('wsdde',names);
        
     if( checklikeid(names, req.body.name) ){

            res.json({
                success: true,
                msg: "username already exists...please try with anothor name",
            })
          
        }else{
            res.json({
                msg: 'proceed',
                success: false
            })
        }

      })
    }else{
        // console.log('supr', detail.name);
        if(req.body.name == detail.name){

             console.log("yess curr");
   
        }
    } 
}



)
}

// set unique name for user
exports.Uniquename = function(req,res){
console.log(req.body);
    users.distinct(req.body.field, function(err,names){

        console.log('wsdde',names);
        
     if( checklikeid(names, req.body.name) ){

            res.json({
                success: true,
                msg: "username already exists...please try with anothor name",
            })
          
        }else{
            res.json({
                msg: 'proceed',
                success: false
            })
        }

      })
}

// set unique name for email
exports.Uniquemail = function(req,res){
    // console.log(req.body.name);
        users.distinct('email', function(err,email){
            if( checklikeid(email, req.body.email) ){
                res.json({
                    success: true,
                    msg: "email already exists...please try with anothor name"
                })
              
            }else{
                res.json({
                    msg: 'proceed',
                    success: false
                })
            }
    
        })
    }

//block & unblock user
exports.blockuser = function(req,res){
    if( req.body.userid && req.body.blockid){

        users.findOne({_id: req.body.userid} ,function(err, userdata){
            if(err){
                res.send(err);
            }
            else {
                // res.send(userdata['blockids']);

                if( checklikeid(userdata['blockids'], req.body.blockid ) ) {
                    let query = {'_id': req.body.userid};
                    let update = {blockids: req.body.blockid };
                    var options = {new: true};
                    users.findOneAndUpdate(query, {$pull:update}, options, function(err, data) {
                        if(err) {
                            res.send(err);
                        }
                        else {
                            res.send(data._id);
                        }
                    });
                }
                else {
                    let query = {'_id': req.body.userid};
                    let update = {blockids: req.body.blockid };
                    var options = {new: true};
                    users.findOneAndUpdate(query, {$push:update}, options, function(err, data) {
                        if(err) {
                            // res.send(err);
                        msg:"error"
                        }
                        else {
                            res.send(data._id);
                        }
                    });
                }
            }
        }) 
    }
    else {
        req.send({
            status: false,
            msg: 'Waiting for inputs'
        })
    }

}



//get all blockids of requested userid
exports.getblockids = function(req,res){
    if( req.body.userid){

        users.findOne( {_id: req.body.userid} , function(err, userdata){
            if(err){
                // res.send(err);
                console.log('some erorr')
            }
            else {
                res.send(userdata['blockids']);
            }
        }) 
    }
    else {
        req.send({
            status: false,
            msg: 'Waiting for inputs'
        })
    }

}



exports.uploadSingle = function(req,res){
    var receiveArrayFiles = req.file;
    var regularpath;
   
    regularpath = req.protocol + "://" + req.get('host') + '/' + receiveArrayFiles.path;

    console.log(regularpath);
    
    let mangooseid = req.body.id;
    console.log(mangooseid);
    var query = {"_id": mangooseid};
    var options = {new: true};

    users.findOneAndUpdate(query, {$set:{profilepic:regularpath}}, options, function(err, user) {
    //   console.log('000000 = ',err, post)
      if (err) {
        console.log('got an error');
      }
      else {
        res.send(user); 
      }
    }); 
}