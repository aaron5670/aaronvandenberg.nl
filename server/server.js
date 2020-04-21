'use strict';
const express = require('express');
const http = require('http');
const https = require('https');
const passport = require('passport');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const srvConfig = require('./config');
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

let httpServer;
if (srvConfig.isHTTPS) {
    const privateKey = fs.readFileSync(srvConfig.privateKey_path, 'utf8');
    const certificate = fs.readFileSync(srvConfig.certificate_path, 'utf8');
    const ca = fs.readFileSync(srvConfig.ca_path, 'utf8');

    // Create a HTTPS server
    httpServer = https.createServer({
        key: privateKey,
        cert: certificate,
        ca: ca
    }, app);
} else {
    // Create a HTTP server
    httpServer = http.createServer({}, app);
}

// Start the server
httpServer.listen(srvConfig.PORT, () =>
    console.log(`Portfolio server listening on port ${srvConfig.PORT}!`)
);

/*
 * Socket.IO section
 */
const io = require('socket.io')(httpServer);
let clients = 0;
io.on('connection', function (socket) {
    console.log('New connection');
    clients++;

    // Added a delay of 350ms
    setTimeout(() => {
        io.sockets.emit('broadcast', {users: clients});
    }, 350);

    socket.on("sendCustomMessage", (data) => {
        socket.broadcast.emit('broadcastReceivedMessage', {msg: data.msg});
    });

    socket.on('disconnect', () => {
        clients--;
        console.log('Connection left');
        io.sockets.emit('broadcast', {users: clients});
    });
});
