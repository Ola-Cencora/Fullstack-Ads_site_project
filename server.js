const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const connectToDB = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// start express server
const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...');
});

// connect to data base
connectToDB();

// add middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: process.env.sessionSecret, store: MongoStore.create(mongoose.connection), resave: false, saveUninitialized: false }));

// serve static files from the React app
//app.use(express.static(path.join(__dirname, '/client/build')));
//app.use(express.static(path.join(__dirname, '/public')));

// import routes
app.use('/api', require('./routes/adverts.routes'));
app.use('/auth', require('./routes/auth.routes'));

/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});*/

app.use((req, res) => {
    res.status(404).send({ message: "Not found..." });
});