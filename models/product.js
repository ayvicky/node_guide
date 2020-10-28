const path = require('path');
const fs = require('fs');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            return cb([]);
        }
        return cb(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save() {
        getProductsFromFile(products => {
            console.log(this.title, this.price);
            products.push({
                title: this.title,
                imageUrl: this.imageUrl,
                price: this.price,
                description: this.description
            });
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
        fs.readFile(p, (err, fileContent) => {})
        // products.push(this);
    }
    static fetchAll(cb) {
        getProductsFromFile(cb);      
        // return products;
    }
};