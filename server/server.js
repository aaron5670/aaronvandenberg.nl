'use strict';
const express = require('express');
const https = require('https');
const WebSocket = require('ws');
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

// Create the Web socket server.
const server = https.createServer({
    cert: certificate,
    key: privateKey,
});
const websocketServer = new WebSocket.Server({server});

//Upgrade the protocol
httpsServer.on('upgrade', (req, networkSocket, head) => {
    sessionParser(req, {}, () => {
        websocketServer.handleUpgrade(req, networkSocket, head, newWebSocket => {
            websocketServer.emit('connection', newWebSocket, req);
        });
    });
});

let wsConnections = 0;
websocketServer.on('connection', (socket, req) => {
    wsConnections++;
    websocketServer.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                currentConnections: wsConnections,
            }));
        }
    });

    socket.on('close', function close() {
        wsConnections--;
        websocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    currentConnections: wsConnections,
                }));
            }
        });
    })
});

// Start the server
httpsServer.listen(srvConfig.PORT, () =>
    console.log(`Portfolio server listening on port ${srvConfig.PORT}!`)
);
