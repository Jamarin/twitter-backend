require('./models/user')
require('./models/tweet')

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const socket = require('socket.io')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

/** CORS **/
app.use(cors({ origin: '*' }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});
/** CORS **/

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect('mongodb://tweet:tweet@localhost:27017/twitter',
    {useNewUrlParser: true, useUnifiedTopology: true})

const userRoutes = require('./routes/user')
const tweetRoutes = require('./routes/tweet')
const {authenticateToken} = require("./middlewares/jwt");

app.use('/user', userRoutes)

app.use('/tweet', authenticateToken, tweetRoutes)

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', () => {
    console.log('connected')
});

server.listen(3000);