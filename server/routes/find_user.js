const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const users = require('../models/user'); //create new post schema

exports.finde = function (req, res) {
    // console.log(req.params.name);
    // let query = { "name": req.params.name };
    // let suche = req.params.name;



    users.find({ 'name': req.params.name }, function(err, post) {
      //  console.log(post);
     

            if (post) {
                res.send({
                    data: post,
                    msg: 'data success',
                    status: true
                });

            }
            else {
                res.send({
                    msg: 'no data found'

                })
            }
        })


    
    



};



