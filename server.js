'use strict'

const express = require('express')
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');

const apiHandler = require('./routes/apiHandler');

const PORT = process.env.PORT || 3000;

const app = express();

// Set Static Folder
app.use(express.static(path.join(__dirname, 'dist')));

// Set views engine
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use Routes
app.use('/api', apiHandler);

// Use redirect for all client requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, function() {
    console.log('server started on port %s', PORT);
});
