// Load required packages
var mongoose = require('mongoose');

// Define our client schema
var ClientSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  id: { type: String, required: true },
  secret: { type: String, required: true },
  userId: { type: String, required: true }
});

// Export the Mongoose model
module.exports = mongoose.model('Client', ClientSchema);


/*The first thing we need to do is add a new model, controller, and endpoints to 
allow us to create new application clients. An application client is what would 
request access to a user account. Perhaps something like a service that wants to 
help manage your beer collection to notify you when you are running low.*/