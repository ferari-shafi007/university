const mongoose = require('mongoose');

const bachSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    session: String,
    fbLink: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const bach = mongoose.model('bach', bachSchema);

module.exports = bach;