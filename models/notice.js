//jshint esversion:6

const mongoose = require('mongoose');




let noticeSchema = new database.Schema({
    date: String,
    subject: String,
    body: String,
    file: String,
    bach: String
});

let notice = database.model('Notice', noticeSchema);

module.exports = notice;