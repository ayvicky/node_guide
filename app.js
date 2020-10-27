const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// app.set('view engine', 'pug');

    // app.engine('handlebars', expressHbs({
    //     layoutsDir: 'views/layouts/',
    //     defaultLayout: 'main-layout',
    //     extname: 'handlebars',
    // }));
// app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');
app.set('views', 'views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
// app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.router);
app.use('/shop', shopRoutes);

app.use((req, res, next) => {
    // res.sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {
        pageTitle: 'Page Not Found!'
    });
})

app.listen(3000);