'use strict'

var express = require('express');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var beer = require('./routes/beerRoutes');
var user = require('./routes/userRoutes');
var passport = require('passport');
var clients = require('./routes/clientRoutes');

mongoose.connect("mongodb://JD_V:Bats1918@ds121464.mlab.com:21464/beerdatabase");

var db = mongoose.connection;

db.on('error',function(err){
    console.log(err);
})

db.once('open',function(){  
    console.log("dabatase connectio was successful");
})

var app = express();
app.use(morgan('dev'));
app.use(bodyparser.json());

var router = express.Router();

// Use the passport package in our application
app.use(passport.initialize());
app.use('/api/clients', clients);
app.use('/api/beer', beer);
app.use('/api/user', user);

//unhandled routes handler
app.use(function(req,res,next){
    var error = new Error("Not Found");
    error.status = 404;
    next(error);
})


// error handler
app.use(function(err,req,res,next){
    res.status(err.status || 500);
    res.json({
        message : err.message
    })
})

var port = 3002 || process.env.PORT;

app.listen(port,function(err){
    if(err) console.log(err);
    console.log("express app is listeninig on port " + port);
});