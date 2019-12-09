let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/users"); 

let user_schema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    emailAddress: String
});

let User = mongoose.model("User", user_schema);

module.exports.User = User;