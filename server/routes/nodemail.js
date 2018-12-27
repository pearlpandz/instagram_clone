var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const Posts = require('../models/index'); //create new post schema
const users = require('../models/user'); //create new user schema
const jwt = require('jsonwebtoken');
const config = require('./../common/config');
var bcrypt = require('bcrypt');
let salt= bcrypt.genSaltSync(8);
var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'muthu@appoets.com',
    pass: 'muthu.pandi1'
  }
}));
// exports.mail = function(req,res){

//     users.findOne({"email":req.body.email}, function(err,datas){
//        if(err){
//             res.send("err");
//         }else{
//             // res.send(datas);
//             var token = jwt.sign({name:req.body.name}, config.secret, {
//                 expiresIn: 60*60*24 // expires in 24 hours
//             });
//             // res.send(token)
//             var mailOptions = {
//                 from: 'muthu@appoets.com',
//                 to: datas.email,
//                 subject: 'Sending Email using Node.js[nodemailer]',
            
//                 html:'<p>hi '+ datas.name+',<br> We got a request to reset your Mogram password</p><a  href="http://localhost:4200/reset">click here to change the pwd</a>'  
//             };
              
              
//                   // res.send('in');
//                   transporter.sendMail(mailOptions, function(error, info){
//                       // console.log('adf');
//                   if (error) {
//                       res.send({
//                           msg: error,
//                           status: false
//                       });
//                   } else {
//                       res.send('Email sent:' + info.response);
//                   }
//                   });  
//         }
//     })


// }

exports.mail = function(req,res){
    users.findOne({ email: req.body.email }).exec(function(err, user) {
        if (err) throw err; // Throw error if cannot connect
        if (!user) {
            res.json({ success: false, message: 'Username was not found' }); // Return error if username is not found in database
        }  else {
            user.resettoken = jwt.sign({ name: user.name, email: user.email },config.secret, { expiresIn: '24h' }); // Create a token for activating account through e-mail
            // Save token to user in database
            user.save(function(err) {
                if (err) {
                    res.json({ success: false, message: err }); // Return error if cannot connect
                } else {
                    // Create e-mail object to send to user
                    var mailOptions = {
                                        from: 'muthu@appoets.com',
                                        to: user.email,
                                        subject: 'Localhost Reset Password Request',
							text: 'Hello ' + user.name + ', You recently request a password reset link. Please click on the link below to reset your password:<br><br><a href="http://localhost:4200/reset/' + user.resettoken,
							html: 'Hello<strong> ' + user.name + '</strong>,<br><br>You recently request a password reset link. Please click on the link below to reset your password:<br><br><a href="http://localhost:4200/reset/' + user.resettoken + '">http://localhost:4200/reset/</a>'
						
                                    };
                                      
                    // Function to send e-mail to the user
                    transporter.sendMail(mailOptions , function(err, info) {
                        if (err) console.log(err); // If error with sending e-mail, log to console/terminal
                    });
                    res.json({ success: true, message: 'Please check your e-mail for password reset link' }); // Return success message
                }
            });
        }
    });
}

exports.mailreset = function(req,res) {
    users.findOne({ resettoken: req.params.token }).select().exec(function(err, user) {
        if (err) throw err; // Throw err if cannot connect
        var token = req.params.token; // Save user's token from parameters to variable
        // Function to verify token
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.json({ success: false, message: 'Password link has expired' }); // Token has expired or is invalid
            } else {
                if (!user) {
                    res.json({ success: false, message: 'Password link has expired1' }); // Token is valid but not no user has that token anymore
                } else {
                    // res.json({ success: true, user: user }); // Return user object to controller
                    users.findOne({ email: user.email }).select('username email name password resettoken').exec(function(err, user) {
                        if (err) throw err; // Throw error if cannot connect
                        if (req.body.password == null || req.body.password == '') {
                            res.json({ success: false, message: 'Password not provided' });
                        } else {
                            user.password = req.body.password; // Save user's new password to the user object
                            user.resettoken = false; // Clear user's resettoken 
                            // Save user's new data
                            user.save(function(err) {
                                if (err) {
                                    res.json({ success: false, message: err });
                                } else {
                                    // Create e-mail object to send to user
                                    var email = {
                                        from: 'muthu@appoets.com',
                                        to: user.email,
                                        subject: 'Localhost Reset Password',
                                        text: 'Hello ' + user.name + ', This e-mail is to notify you that your password was recently reset at localhost.com',
                                        html: 'Hello<strong> ' + user.name + '</strong>,<br><br>This e-mail is to notify you that your password was recently reset at localhost.com'
                                    };
                                    // Function to send e-mail to the user
                                    transporter.sendMail(email, function(err, info) {
                                        if (err) console.log(err); // If error with sending e-mail, log to console/terminal
                                    });
                                    res.json({ success: true, message: 'Password has been reset!' }); // Return success message
                                }
                            });
                        }
                    });
                   

                
                }
            }
        });
    });
}

// Save user's new password to database
// exports.savenewpassword = function(req,res) {
    
// }
