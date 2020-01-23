'use strict';
const fs = require('fs');
const express = require('express');
const https = require('https');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const srvConfig = require('./config');

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

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const httpsServer = https.createServer(credentials, app);

//Use the bodyParser middleware
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: srvConfig.EMAIL,
        pass: srvConfig.EMAIL_PASSWORD
    }
});

const sendEmail = ($subject, $message) => {
    transporter.sendMail({
        from: srvConfig.EMAIL,
        to: srvConfig.EMAIL,
        subject: $subject,
        html: $message
    });
};

app.post('/portfolio-contact', (req, res) => {
    const {name, email, message, recaptcha, success} = req.body;
    if (name && email && message && recaptcha && success) {
        const body = `
            <b>Naam:</b> ${name}<br/>
            <b>Email:</b> ${email}<br/><br/>
            <b>Bericht:</b><br/>
            ${message}
            <br/>
            <br/>
            <i>Verzonden vanaf <a href="https://aaronvandenberg.nl/">aaronvandenberg.nl</a></i>
        `;

        sendEmail('Nieuwe email vanaf contactformulier 🔥', body);
        return res.json({
            message: 'successfully send'
        })
    } else return res.json({
        message: 'Something went wrong!'
    })
});

// Start the server.
httpsServer.listen(srvConfig.PORT, () => console.log(`Portfolio server listening on port ${srvConfig.PORT}!`));
