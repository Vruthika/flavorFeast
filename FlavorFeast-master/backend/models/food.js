const mongoose = require('mongoose');

// Define the schema
const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    ingredients: [{
        name: String,
        quantity: String,
        unit: String
    }],
    steps: [String],
    prepTime: Number, 
    cookTime: Number, 
    totalTime: Number, 
    servings: Number,
    tags: [String],
    nutrition: {
        calories: Number,
        carbohydrates: Number, 
        proteins: Number, 
        fats: Number, 
        fiber: Number, 
        sugar: Number, 
        sodium: Number 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
