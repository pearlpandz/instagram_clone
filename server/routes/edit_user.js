const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const users = require('../models/user'); //create new post schema
var bcrypt = require('bcrypt');
let salt = bcrypt.genSaltSync(8);
exports.create = function (req, res) {

    let query = { '_id': req.body.id };

    users.findOneAndUpdate(query,
        {
            $set: {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                website: req.body.website,
                bio: req.body.bio,
                gender: req.body.gender,
                phonenumber: req.body.phonenumber
            }
        }, { new: true },

        function (err, post) {
            if (err) {
                res.send(err);
            } else {
                console.log(post)
                res.send(post);
            }
        });



};

exports.disableaccount = function (req, res) {

    let query = { _id: req.body.id }
    users.findOne(query, function (err1, post1) {
        if (err1) {
            res.send(err1)
        } else {
            bcrypt.compare(req.body.oldpass, post1.password, function (err, pass) {

                if (err) {
                    console.log(err)
                }
                else {
                    //  console.log(pass)
                    if (pass == true) {

                        users.findOneAndUpdate(query, { $set: { Disableaccount: true } }, { new: true }, function (err1, post1) {
                            if (err1) {
                                res.send('err1')
                            } else {
                                res.send({
                                    data: post1.name,
                                    msg: 'going to disable ur account',
                                    disable: true,
                                })
                            }

                        })
                    }

                }

            })

        }
    })


}