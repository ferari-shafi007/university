const mongoose = require('mongoose');

const generalSchema = new mongoose.Schema({
    name: String,
    tagline: String,

    facebook: String,
    twitter: String,
    instagram: String,
    google: String,
    tumblr: String,
    aboutImg: String,
    aboutHeader: String,
    aboutText: String,
    street: String,
    city: String,
    phone: String,
    map: String,

    email: String


});

const general = mongoose.model('general', generalSchema);

module.exports = general;