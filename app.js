const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { dirname } = require('path');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
// app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.router);
app.use('/shop', shopRoutes);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);