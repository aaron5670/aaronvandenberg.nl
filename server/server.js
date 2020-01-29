'use strict';
const express = require('express');
const https = require('https');
const passport = require('passport')
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session')
const srvConfig = require('./config/config');
const route = require('./routes/init');

// Define Express
const app = express();

// Cors middleware
app.use(cors({origin: true, credentials: true}));
app.options('*', cors({
    origin: true,
    credentials: true
}));

// Session middleware
app.use(session({
    secret: srvConfig.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Other necessary middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

// Routes
app.use('/', route);

// SSL Certificate
const privateKey = fs.readFileSync('/opt/psa/var/modules/letsencrypt/etc/live/aaronvandenberg.nl/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/opt/psa/var/modules/letsencrypt/etc/live/aaronvandenberg.nl/cert.pem', 'utf8');
const ca = fs.readFileSync('/opt/psa/var/modules/letsencrypt/etc/live/aaronvandenberg.nl/chain.pem', 'utf8');

// Start the server.
https.createServer({
    key: privateKey,
    cert: certificate,
    ca: ca
}, app).listen(srvConfig.PORT, () => console.log(`Portfolio server listening on port ${srvConfig.PORT}!`));
