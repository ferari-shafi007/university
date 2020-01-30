const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    name: String,
    portfolioImg: String,
    description: String,
    type: String




});

const portfolio = mongoose.model('portfolio', portfolioSchema);

module.exports = portfolio;