//node dependencies - express
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const server = require('http').createServer(app);




// const fs = require('fs');

//node dependencies - mangoose
const mongoose = require('mongoose');

// define mongo port
const port = process.env.PORT || 3000;

//mangoose.connect
mongoose.connect('mongodb://127.0.0.1:27017/instagram_clone');

// Router - Express functions
const router = require('express').Router();


// node dependencies - bodyparser, path
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(fileUpload());


// Access-Control- Allow-Origin | Allow-Methods | Allow-Headers | Allow-Credentials
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});


// calling routes folder
const post = require('./routes/index.js');

// api hiting place
app.post('/post', post.create); //api for post create

app.post('/upload', function(req, res) {
    if (!req.body)
      return res.status(400).send('No files were uploaded.');
   
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
   console.log(sampleFile);
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv("hi.jpg", function(err) {
      if (err)
        return res.status(500).send(err);
   
      res.send('File uploaded!');
    });
  });

// run server
server.listen(port, () => console.info(`App running on port ${port}`));