var userModel  = require('../models/user.js');
var express = require('express');
var _  = require('lodash');
var authController = require('./auth');

var router = express.Router();

router.param('uId',function(req,res,next,uId){

    userModel.findById(uId,function(err,data){
                 if(err) return next(err);
                 if(!data) {
                     var error = new Error("Not Found");
                     error.status  = 404;
                     return next(error);
                 }
                 req.user  = data;
                 next();
             });
});


router.get("/", authController.isAuthenticated, function(req,res,next) {
    userModel.find({})
             .sort({createdAt:1})
             .exec(function(err,data){
                 if(err) return next(err);
                 res.status(201);
                 res.json(data);
             });
})


router.get("/:uId", function(req,res,next) {
    res.status(201);
    res.json(req.user);
})

router.post("/", function(req,res,next) {
    var user = new userModel(_.pick(req.body,['username','password']));

    user.save(function(err,data){
        if(err) return next(err);
        res.status(201);
        res.json(data);
    })
})

router.put("/:bId", function(req,res,next) {
    
    var updates = _.pick(req.body,['password']);

    req.user.update(updates, function(err,data) {
        if(err) return next(err);
        res.status(201);
        res.json(data);
    })
})



module.exports = router;