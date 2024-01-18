const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const connectToDB = require('./db');

const advertsRoutes = require('./routes/adverts.routes');

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

// serve static files from the React app
//app.use(express.static(path.join(__dirname, '/client/build')));
//app.use(express.static(path.join(__dirname, '/public')));

// import routes
app.use('/api', advertsRoutes);

/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});*/

app.use((req, res) => {
    res.status(404).send({ message: "Not found..." });
});