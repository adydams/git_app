const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//mongoose schema obj
let userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    telephone: String,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', userSchema)