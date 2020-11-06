const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
// app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5fa5458aef080c1e5c13d045')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
    .connect(
        'mongodb://localhost:27017/complete-node',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(result => {
        User.findOne().then(user => {
            if(!user) {
                const newUser = new User({
                    name: 'AY ViCky',
                    email: 'demo@example.com',
                    cart: {
                        items: []
                    }
                });
                newUser.save();
            }
        });
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })
