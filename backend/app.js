/*
 * @Author: labike 
 * @Date: 2018-08-22 16:57:01 
 * @Last Modified by: labike
 * @Last Modified time: 2018-08-23 11:38:36
 */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

/*
    db
*/
const config = require('./db');

const users = require('./routes/user'); 

/*
const DB_URL = 'mongodb://127.0.0.1:27017/auth'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
    console.log('connection success!')
})
*/
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();

app.use(passport.initialize());
require('./passport')(passport);

/*
    urlencode({extended: false})允许在`qs`和`querystring`
    两个选择一个进行解析,默认为true,选择的是`qs`解析,
    但是现在`qs`已经废弃
*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

app.get('/', function(req, res) {
    res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});