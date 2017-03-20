const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const config = require('./config/config.js');

app.use(express.static(path.join(__dirname, 'build')));

app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}`);
});