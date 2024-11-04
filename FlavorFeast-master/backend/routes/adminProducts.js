// routes/admin.js
const express = require('express');
const router = express.Router();
const Recipe = require('../models/food.js');

router.post('/add-product', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.json({ success: true, message: 'Product added successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/delete-product/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    // Find the product by ID and delete it from the database
    const deletedProduct = await Recipe.findByIdAndDelete(productId);

    if (!deletedProduct) {
      // If no product is found with the given ID, return 404 Not Found
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    // If an error occurs during the deletion process, return 500 Internal Server Error
    console.error("Error deleting product:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
