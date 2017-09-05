// Load required packages
var ClientModel = require('../models/client');
var express = require('express');
var _  = require('lodash');
var authController = require('./auth');
var router = express.Router();


router.get("/", authController.isAuthenticated, function(req,res,next) {
  // Use the Client model to find all clients
  ClientModel.find({ userId: req.user._id }, function(err, clients) {
    if (err) return next(err);
    res.json(clients);
  })
})

 // Save the client and check for errors
 router.post("/", authController.isAuthenticated, function(req,res,next){
  
  var client = new ClientModel(_.pick(req.body,['name','userId','secret','id']));
  
  client.save(function(err) {
    if (err) return next(err);
    res.json({ message: 'Client added to the locker!', data: client });
  });
});



module.exports = router;