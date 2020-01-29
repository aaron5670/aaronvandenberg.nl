'use strict';
const express = require('express');
const https = require('https');
const passport = require('passport')
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session')
const app = express();
const srvConfig = require('./config/config');
const route = require('./routes/init');

// needed to make all requests from client work with this server.
app.use(cors({origin: true, credentials: true}));
app.options('*', cors({
    origin: true,
    credentials: true
}));

// SSL Certificate
const privateKey = fs.readFileSync('/opt/psa/var/modules/letsencrypt/etc/live/aaronvandenberg.nl/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/opt/psa/var/modules/letsencrypt/etc/live/aaronvandenberg.nl/cert.pem', 'utf8');
const ca = fs.readFileSync('/opt/psa/var/modules/letsencrypt/etc/live/aaronvandenberg.nl/chain.pem', 'utf8');

const httpsServer = https.createServer({
    key: privateKey,
    cert: certificate,
    ca: ca
}, app);

//Use the bodyParser middleware
app.use(bodyParser.json());

//Routes
app.use('/', route);

// Start the server.
httpsServer.listen(srvConfig.PORT, () => console.log(`Portfolio server listening on port ${srvConfig.PORT}!`));
