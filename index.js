const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Router = require('./app/routes/routes');
const devDBUrl= 'mongodb://tentman:journeyman10@ds257314.mlab.com:57314/todotesting';

let port = 1234;

let mongoDB = process.env.MONGODB_URI || devDBUrl;
    mongoose.connect(mongoDB);
    mongoose.Promise = global.Promise;

let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let app = express();
    app.set('view engine','ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static('public'));
    app.use('/', Router);
    app.listen(port, () => {
        console.log('Server is up and running on port number ' + port);
    });