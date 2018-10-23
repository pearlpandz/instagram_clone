//node dependencies - express
const express = require('express');
var multer = require('multer');
const app = express();
var cors = require('cors');
const server = require('http').createServer(app);
const jwt = require('jsonwebtoken');

//node dependencies - mangoose
const mongoose = require('mongoose');


// define mongo port
const port = process.env.PORT || 3000;


//mangoose.connect
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/instagram_clone', { useNewUrlParser: true });
mongoose.connect('mongodb://127.0.0.1:27017/instagram_clone', { useNewUrlParser: true });


// node dependencies - bodyparser, path
const bodyParser = require('body-parser');
const path = require('path');


app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// given full permission to access this folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// middleware
const middleware = require('./common/middleware'); //common middleware for all requests
console.log('-------------------------------');
// calling routes folder
const routes_posts = require('./routes/index'); //create new post schema
const routes_upload_post = require('./routes/post_uploads'); //create new post schema
const routes_getposts = require('./routes/get_posts'); //get all post data
const create_user = require('./routes/add_user'); //create user
const userlogin = require('./routes/login_user'); //user login
const searchuser = require('./routes/search_user');// search User

const likepost = require('./routes/like_post');

// file upload multer function
var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads');
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + '.' + file.mimetype.split('/').pop());
    }
  })
});


// create new post
app.post('/post', routes_posts.create);

//upload post pic
app.post('/upload', upload.array('sampleFile'), routes_upload_post.upload);

//get posts middleware.checkToken,
app.post('/getpost', routes_getposts.getpost);

//create user
app.post('/adduser', create_user.adduser);

//create user
app.post('/userlogin', userlogin.login);
//search user
app.post('/search/:name', searchuser.search);

//like post
app.post('/likepost', likepost.likepost);

// run server
server.listen(port, () => console.info(`App running on port ${port}`));