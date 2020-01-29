const express = require('express');
const init = express.Router();
const contactRoute = require('./contact');

init.get('/', (req, res) => res.json({
    method: 'GET',
    url: '/'
}));

/*
 * Define all routes
 */
init.use('/contact', contactRoute);

module.exports = init;
