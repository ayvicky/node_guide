const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: '20',
    host: 'db4free.net',
    port: '3306',
    user: 'dr_acid',
    password: 'my1234db',
    database: 'node_complete',
});

module.exports = pool.promise();