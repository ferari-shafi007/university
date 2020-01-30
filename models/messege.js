const mongoose = require('mongoose');

const messegeSchema = new mongoose.Schema({

    date: String,
    subject: String,
    noticeBody: String,
    noticeFile1: String,
    noticeFile2: String,
    noticeFile3: String,
    noticeFile4: String,
    bach: [String]
});

const messege = mongoose.model('messege', messegeSchema);

module.exports = messege;