// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var userModel = require('../models/user');
var clients = require('./clientRoutes');

/*The one thing to note here is that when we call passport.use() 
we are not just supplying a BasicStrategy object. Instead we are 
also giving it the name client-basic. Without this, we would not 
be able to have two BasicStragies running at the same time. */

passport.use('client-basic', new BasicStrategy(

    function(username,password,callback) {
        Client.findOne({ id: username }, function (err, client) {
            if (err) { return callback(err); }

            // No client found with that id or bad password
            if (!client || client.secret !== password) { return callback(null, false); }

            // Success
            return callback(null, client);
        });

    }
))


exports.isAuthenticated = passport.authenticate('basic', { session : false });