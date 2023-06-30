const mongoose = require('mongoose');

const Veggie = new mongoose.Schema({
    price: Number,
    name: String,
});

module.exports = mongoose.model('Veggies', Veggie);
