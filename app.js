const http = require('http');
const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('in the middleware');
    next();
});

app.use((req, res, next) => {
    console.log('in anothe middleware');
    res.send('<h1> Hello world! </h1>')
});


// const server = http.createServer(app);

// server.listen(3000);
app.listen(3000);