const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const Posts = require('../models/index'); //create new post schema
let limits;
let addskip;
exports.getpost = function (req, res) {
  if (req.body.skip == 0) {
     limits = 2;
     addskip = parseInt(req.body.skip)+limits;
     console.log(addskip);
  } else {
     limits = 3;
     addskip = parseInt(req.body.skip)+limits;
     console.log(addskip);
  }
  Posts.find({}).sort('-createdat').skip(parseInt(req.body.skip)).limit(2).exec(function (err, post) {
    if (err) {
      res.json(err);
    }
    else {
      res.json({
        data: post,
         skip : addskip
      });
    }
  });
};
exports.singlepostafter = function (req, res, next) {
  // console.log(req.body.id);
  Posts.findOne({ _id: { $gt: (req.body.id) } }).sort({ _id: 0 }).limit(1).exec(function (err1, post1) {
    // console.log(post1);
    if (err1) {
      res.json({
        data: err1,
        msg: false
      });
    } else {
      if (req.body.userid == post1.userid) {
        // res.send(post1);
        Posts.findOne({ _id: { $gt: (req.body.id) } }).sort({ _id: 0 }).limit(1).exec(function (err2, post2) {
          if (err2) {
            res.json({
              data: err2,
              message: false
            })
          } else {
            res.json({ data: post2 })
          }
        })
      } else {
        res.json({
          data: err1,
          message: 'not a current user'
        });

      }
    }
  })
}
exports.notes = function (req, res) {
  console.log(req.body)
  res.send("welcome");

}
/* posts.post('/notes',(req,res) =>{
  res.send("welcome");
}) */
exports.singlepostsprevious = function (req, res, next) {
  // console.log(req.body.id);
  Posts.findOne({ _id: { $lt: (req.body.id) } }).sort({ _id: -1 }).limit(1).exec(function (err1, post1) {
    // console.log(post1);
    if (err1) {
      res.json({
        data: err1,
        msg: false
      });
    } else {
      if (req.body.userid == post1.userid) {
        // res.send(post1);
        Posts.findOne({ _id: { $lt: (req.body.id) } }).sort({ _id: -1 }).limit(1).exec(function (err2, post2) {
          if (err2) {
            res.json({
              data: err2,
              message: false
            })
          } else {
            res.json({ data: post2 })
          }
        })
      } else {
        res.json({
          data: post1._id,
          message: 'not a current user'
        });

      }
    }
  })
}