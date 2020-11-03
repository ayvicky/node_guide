const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequalize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');

const errorController = require('./controllers/error');

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
    User.findByPk(1)
        .then(user => {
            console.log('user found!');
            console.log(user);
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequalize.sync().then(result => {
    return User.findByPk(1);
})
.then(user => {
    if(!user) {
        return User.create({ name: 'Max', email: 'test@test.com'});
    }
    return user;
})
.then(user => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});