var beerModel  = require('../models/beer.js');
var express = require('express');
var _  = require('lodash');
var router = express.Router();


router.param('bId',function(req,res,next,bId){

    beerModel.findById(bId,function(err,data){
                 if(err) return next(err);
                 if(!data) {
                     var error = new Error("Not Found");
                     error.status  = 404;
                     return next(error);
                 }
                 req.beer  = data;
                 next();
             });
});


router.get("/", function(req,res,next) {
    beerModel.find({})
             .sort({createdAt:1})
             .exec(function(err,data){
                 if(err) return next(err);
                 res.status(201);
                 res.json(data);
             });
})


router.get("/:bId", function(req,res,next) {
    res.status(201);
    res.json(req.beer);
})

router.post("/", function(req,res,next) {
    var beer = new beerModel(_.pick(req.body,['name','type','quantity']));

    beer.save(function(err,data){
        if(err) return next(err);
        res.status(201);
        res.json(data);
    })
})

router.put("/:bId", function(req,res,next) {
    
    var updates = _.pick(req.body,['name','type','quantity']);

    req.beer.update(updates, function(err,data) {
        if(err) return next(err);
        res.status(201);
        res.json(data);
    })
})

module.exports = router;