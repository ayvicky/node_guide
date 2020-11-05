const mongodb = require('mongodb');
const Product = require('../models/product');

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const {title, imageUrl, description, price} = req.body;
    const product = new Product(title, price, description, imageUrl, null, req.user._id);
    product.save()
            .then(result => {
                console.log('Created Product');
                res.redirect('/admin/products');
            }).catch(err => console.log(err));

};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if(!product)
                return res.redirect('/');
            res.render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
        })
        .catch(err => console.log(err));
    return;
    Product.findByPk({where: {id: prodId}}).then(products => {
        if(!products[0]) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: products[0]
        });
    }).catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const {
        productId,
        title,
        imageUrl,
        description,
        price
    } = req.body;
    const product = new Product(
        title,
        price,
        description,
        imageUrl,
        productId
    );
    product.save()
    .then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
    const { productId } = req.body;
    Product.deleteById(productId)
    .then(result => {
        console.log('DESTROYED PRODUCT');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });    
        }).catch(err => console.log(err));
    return;
    Product.findAll().then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    }).catch(err => console.log(err));
};