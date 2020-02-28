'use strict';
const express = require('express');
const https = require('https');
const passport = require('passport');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
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
// WebSocket server, to give socket-handlers access to the session.
const sessionParser = session({
    secret: srvConfig.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
});
app.use(sessionParser);

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

// Create a HTTPS server
const httpsServer = https.createServer({
    key: privateKey,
    cert: certificate,
    ca: ca
}, app);

// Start the server
httpsServer.listen(srvConfig.PORT, () =>
    console.log(`Portfolio server listening on port ${srvConfig.PORT}!`)
);


/*
 * Socket.IO section
 */
const io = require('socket.io')(httpsServer);
let clients = 0;
io.on('connection', function (socket) {
    console.log('New connection');
    clients++;

    // Added a delay of 350ms
    setTimeout(() => {
        io.sockets.emit('broadcast', {users: clients});
    }, 350);

    socket.on("sendCustomMessage", (data) => {
        io.sockets.emit('broadcastReceivedMessage', {msg: data.msg});
    });

    socket.on('disconnect', () => {
        clients--;
        console.log('Connection left');
        io.sockets.emit('broadcast', {users: clients});
    });
});
