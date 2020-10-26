const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
// app.use(bodyParser.json());

app.use(adminRoutes);
app.use(shopRoutes);

app.use('/', (req, res, next) => {
    console.log('always run');
    next();
})

app.get('/add-product', (req, res, next) => {
    console.log('in the product middleware');
    res.send(`
        <form action='/product' method='POST'>
            <input type='text' name='title'>
            <button type='submit'> Add Product </button>
        </form>
    `)
});

app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/')
});


app.use((req, res, next) => {
    res.status(404).send('<h1> Page not found! </h1>')
})

// const server = http.createServer(app);

// server.listen(3000);
app.listen(3000);