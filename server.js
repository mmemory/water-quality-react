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

app.get('/auth', passport.authenticate('local',{ session: false }), function (req, res) {
    console.log(req.user);
    res.redirect('/home')
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(config.port, function(err) {
    if (err) return;
    console.log(`Listening on port ${config.port}`);
});