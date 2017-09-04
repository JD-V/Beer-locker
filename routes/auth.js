// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var userModel = require('../models/user');


passport.use(new BasicStrategy(

    function(username,password,callback) {
        userModel.findOne({username:username}, function(err,user) {

            if (err) { return callback(err); }

            // No user found with that username
            if (!user) { return callback(null, false); }

            user.verifyPassword(password, function(error,isMatch){
                if (err) { return callback(err); }
                
                // Inavalid password
                if(!isMatch) { return callback(null,false); }
                // Success
                return callback(null, user);
            })
        })
    }
))


exports.isAuthenticated = passport.authenticate('basic', { session : false });