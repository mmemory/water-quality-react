const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const config = require('./config/config.js');

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(bodyParser.json());

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(config.port, function(err) {
    if (err) return;
    console.log(`Listening on port ${config.port}`);
});