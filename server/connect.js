//node dependencies - express
const express = require('express');
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

// run server
server.listen(port, () => console.info(`App running on port ${port}`));