const Product = require('../models/product');

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
    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    }).then(result => {
        console.log('Created Product');
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findAll({where: {id: prodId}}).then(products => {
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
    Product.findAll({where: {id: productId}}).then(products => {
        products[0].title = title;
        products[0].price = price;
        products[0].description = description;
        products[0].imageUrl = imageUrl;
        return products[0].save();
    })
    .then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
    const { productId } = req.body;
    Product.findAll({where: {id: productId}}).then(products => {
        return products[0].destroy();
    })
    .then(result => {
        console.log('DESTROYED PRODUCT');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    }).catch(err => console.log(err));
};