const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.post('/saveProduct', async (req, res) => {
  try {
    // console.log('Get body params : ', req.body.name)
    const name = req.body.name
    const price = req.body.price
    const params = {
      name: name,
      price: price
    }
    const product = await Product.create(params);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/products', async (req, res) => {
  try {
    console.log('Get product.....')
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;