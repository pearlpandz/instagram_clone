//node dependencies - express
const express = require('express');
var multer  =   require('multer');
const app = express();
var cors = require('cors');
const server = require('http').createServer(app);


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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// given full permission to access this folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


// calling routes folder
const routes_posts = require('./routes/index'); //create new post schema
const routes_upload_post = require('./routes/post_uploads'); //create new post schema
const routes_getposts = require('./routes/get_posts'); //get all post data


// file upload multer function
var upload = multer({ storage : multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads');
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + '.' + file.mimetype.split('/').pop() );
    }
  })
});


// create new post
app.post('/post', routes_posts.create);

//upload post pic
app.post('/upload', upload.single('sampleFile'), routes_upload_post.upload);

//get posts
app.post('/getpost', routes_getposts.getpost);


// run server
server.listen(port, () => console.info(`App running on port ${port}`));