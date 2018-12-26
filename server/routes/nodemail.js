var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const Posts = require('../models/index'); //create new post schema
const users = require('../models/user'); //create new user schema
const jwt = require('jsonwebtoken');
const config = require('./../common/config');
var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'muthu@appoets.com',
    pass: 'muthu.pandi1'
  }
}));
exports.mail = function(req,res){

    users.findOne({"email":req.body.email}, function(err,datas){
       if(err){
            res.send("err");
        }else{
            // res.send(datas);
            var token = jwt.sign({name:req.body.name}, config.secret, {
                expiresIn: 60*60*24 // expires in 24 hours
            });
            // res.send(token)
            var mailOptions = {
                from: 'muthu@appoets.com',
                to: datas.email,
                subject: 'Sending Email using Node.js[nodemailer]',
            
                html:'<p>hi '+ datas.name+',<br> We got a request to reset your Mogram password</p><a  href="http://localhost:4200/reset">click here to change the pwd</a>'  
            };
              
              
                  // res.send('in');
                  transporter.sendMail(mailOptions, function(error, info){
                      // console.log('adf');
                  if (error) {
                      res.send({
                          msg: error,
                          status: false
                      });
                  } else {
                      res.send('Email sent:' + info.response);
                  }
                  });  
        }
    })


}