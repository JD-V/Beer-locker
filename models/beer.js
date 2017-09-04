var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var beerSchema = new Schema({
    name: {type:String,required:true},
    type: {type:String,required:true},
    quantity: {type:Number,required:true},
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now}
});

beerSchema.method('update', function(updates,callback){

    Object.assign(this,updates,{updatedAt: new Date()});

    this.save(callback);
})

var beerModel = mongoose.model("beer",beerSchema);

module.exports = beerModel;