const express = require('express');
const path = require('path');
const adminData = require('./admin');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(adminData.products);
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    const products = adminData.products;
    res.render('shop', {
        prods: products, 
        pageTitle: 'Shop', 
        path: '/shop/', 
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
});

module.exports = router;