const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');

router.post('/', (req, res) => {
	const product = new Product({
		name: req.body.name,
		countInStock: req.body.countInStock,
	});
	product.save().then((createdProduct) => {
		res.status(200).json(createdProduct);
	});
});

router.get('/', async (req, res) => {
	const productList = await Product.find();
	res.send(productList);
});

module.exports = router;
