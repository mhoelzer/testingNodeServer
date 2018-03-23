require('dotenv').config();
// With this we can make items in an .env file available to our whole application.

var express = require('express');
var app = express(); 
var test = require('./controllers/testcontroller');
var user = require('./controllers/usercontroller');
var sequelize = require('./db');
var bodyParser = require('body-parser');

sequelize.sync(); // tip: pass in {force: true} for resetting tables

app.use('/api/test', function(req, res){
    res.send("This is data from the /api/test endpoint. It's from the server.");
});

app.use(bodyParser.json());
// app.use(require('./middleware/headers'));

app.use('/test', test);

app.use('/api/user', user);

// app.use('/api/user', require('./controllers/usercontrollers'));
// ^^^ You could also write it this way without the user = require statement above.

app.listen(3000, function(){
    console.log('BADABINGBABADOOK!!!')
});