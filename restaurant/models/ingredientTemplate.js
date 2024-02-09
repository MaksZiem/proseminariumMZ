const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ingredientTemplateSchema = new Schema({
    name: {
        type: String,
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

module.exports = mongoose.model('Ingredient-Template', ingredientTemplateSchema)