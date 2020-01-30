const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: String,
    blogImg: String,
    description: String,
    type: String


});

const blog = mongoose.model('blog', blogSchema);

module.exports = blog;