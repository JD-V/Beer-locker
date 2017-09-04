var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type:String,required:true,unique: true},
    password: {type:String,required:true},
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now}
});

userSchema.method('update', function(updates,callback) {

    Object.assign(this,updates,{updatedAt: new Date()});

    this.save(callback);
});

userSchema.methods.verifyPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.pre("save",function(callback){
    var user = this;
    // Break out if the password hasn't changed
    // console.log("Save called");
    if (!user.isModified('password')) return callback();
    // console.log("Save called 1");
    //password is changed, so we need to salt it
    bcrypt.genSalt(5, function(err, salt) {
        // console.log("Save called 3");
        if (err) return callback(err);
        
        bcrypt.hash(user.password,salt,null, function(err,hashPassword) {
            if (err) return callback(err);
            user.password = hashPassword;
            // console.log("Save called 4 hp " + this.password);
            callback();
        });
    });
});

var userModel = mongoose.model("user",userSchema);

module.exports = userModel;