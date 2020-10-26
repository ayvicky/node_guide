const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../utils/path');

const products = [];

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});
router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title});
    // res.redirect('/shop/');
    res.render('add-product', 
                {pageTitle: 'Add Product',
                 path: '/admin/add-product'});
});

exports.router = router;
exports.products = products;