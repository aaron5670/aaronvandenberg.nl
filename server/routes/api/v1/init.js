const express = require('express');
const init = express.Router();
const path = require('path');
const contactRoute = require('./contact');

init.get('/', (req, res) => {
    res.json({
        description: 'Portfolio API server'
    })
});

/*
 * Define all API routes
 */
init.use('/contact', contactRoute);

module.exports = init;
