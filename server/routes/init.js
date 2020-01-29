const express = require('express');
const init = express.Router();
const contactRoute = require('./contact');
const authRoute = require('./auth');

init.get('/', (req, res) => res.json({
    method: 'GET',
    url: '/'
}));

/*
 * Define all routes
 */
init.use('/contact', contactRoute);
init.use('/auth', authRoute);

module.exports = init;
