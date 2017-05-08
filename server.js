const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const config = require('./config/config.js');

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(bodyParser.json());
passport.initialize();

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('TEST',username, password);
        if(username === 'waterTeam' && password === 'w@terT3am') {
            let user = {
                username: username,
                pass: password
            };
            return done(null, user)
        } else {
            return done(null, false);
        }
    }
));

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    return false;
}

app.post('/api/auth', passport.authenticate('local',{ session: false }), function (req, res) {
    res.end();
});

app.get('/auth/me', isAuthenticated, function (req, res) {
    console.log(req.user);
    res.send(req.user);
});

app.get('/auth/logout', isAuthenticated, function (req, res) {
    req.logout();
    res.end();
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(config.port, function(err) {
    if (err) return;
    console.log(`Listening on port ${config.port}`);
});