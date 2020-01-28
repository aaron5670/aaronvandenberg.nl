const express = require('express');
const srvConfig = require('../../../config/config');
const nodeMailer = require('nodemailer');
const contact = express.Router();

contact.get('/', (req, res) => {
    res.json({
        description: 'Contact server API'
    })
});

//ToDO: Create a middleware for all the email functionality
const transporter = nodeMailer.createTransport({
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

contact.post('/send', (req, res) => {
    const {name, email, message, recaptcha, success} = req.body;

    console.log(req.body)

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

module.exports = contact;
