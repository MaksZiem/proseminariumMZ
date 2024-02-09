const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Ingredient', ingredientSchema)