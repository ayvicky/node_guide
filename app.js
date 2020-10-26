const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
// app.use(bodyParser.json());

app.use('/', (req, res, next) => {
    console.log('always run');
    next();
})

app.use('/add-product', (req, res, next) => {
    console.log('in the product middleware');
    res.send(`
        <form action='/product' method='POST'>
            <input type='text' name='title'>
            <button type='submit'> Add Product </button>
        </form>
    `)
});

app.use('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/')
});
app.use('/', (req, res, next) => {
    console.log('always run!');
    res.send('<h1> Hello from express! </h1>')
})

// const server = http.createServer(app);

// server.listen(3000);
app.listen(3000);