const Sequelize = require('sequelize');

const sequelize = new Sequelize(
        'node_complete',
        'root',
        'my1234db', {
            dialect: 'mysql',
            host: 'localhost'
    });

module.exports = sequelize;
