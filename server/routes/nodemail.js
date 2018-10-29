var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'muthu@appoets.com',
    pass: 'muthu.pandi1'
  }
}));

var mailOptions = {
  from: 'muthu@appoets.com',
  to: 'pearlpandzz@gmail.com',
  subject: 'Sending Email using Node.js[nodemailer]',
  text: 'That was easy!'
};

exports.mail = function(req,res){
    res.send('in');
    transporter.sendMail(mailOptions, function(error, info){
        console.log('adf');
    if (error) {
        res.send({
            msg: error,
            status: false
        });
    } else {
        res.send('Email sent: ' + info.response);
    }
    });  
}