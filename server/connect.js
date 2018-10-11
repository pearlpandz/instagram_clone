//node dependencies - express
const express = require('express');
var multer  =   require('multer');
const app = express();




const server = require('http').createServer(app);




// const fs = require('fs');

//node dependencies - mangoose
const mongoose = require('mongoose');

// define mongo port
const port = process.env.PORT || 3000;

//mangoose.connect
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/instagram_clone', { useNewUrlParser: true });
mongoose.connect('mongodb://127.0.0.1:27017/instagram_clone', { useNewUrlParser: true });

// Router - Express functions
const router = require('express').Router();


// node dependencies - bodyparser, path
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.use(express.static('./uploads'));

// Access-Control- Allow-Origin | Allow-Methods | Allow-Headers | Allow-Credentials
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});


// calling routes folder
const Posts = require('./models/index'); //create new post schema
// api hiting place

var upload = multer({ storage : multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  })
}).single('sampleFile');

app.post('/post', upload, function(req,res){
  console.log(req.file);

  var uploadedFilePath = 'localhost:'+port+'/' + req.file.path;

  let post = new Posts ({
    description: req.body.description,
    location: req.body.location,
    sampleFile: uploadedFilePath
  });

  post.save(function(err,result){
    console.log(uploadedFilePath);
      if(err){
          console.log(err);
      }
      else {
          res.json({'status': 'value inserted', path: uploadedFilePath });
      }
  });  
});


// app.get('/getpost', function(req,res){
//   res.send({ result: 'reached' })
// });


// run server
server.listen(port, () => console.info(`App running on port ${port}`));