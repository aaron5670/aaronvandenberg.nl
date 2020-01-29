const express = require('express');
const auth = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

auth.get('/', (req, res) => {
    res.json({
        method: 'GET',
        url: '/auth'
    })
});

const user = {
    username: 'user',
    password: 'pass',
    id: 1
};

function findUser(username, callback) {
    if (username === user.username) {
        return callback(null, user)
    }
    return callback(null)
}

//Passport middleware for Authentication
passport.use(new LocalStrategy(
    function (username, password, done) {
        findUser(username, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user || password !== user.password) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

auth.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) return next(err);
        if (!user) {
            res.status(401);
            return res.json({message: 'Login failed'});
        }

        req.logIn(user, function (err) {
            if (err) return next(err);
            return res.json({message: 'Successfully logged in', username: user.username});
        });
    })(req, res, next);
});

module.exports = auth;
