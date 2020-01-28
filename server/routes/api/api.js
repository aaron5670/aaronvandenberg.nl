const express = require('express');
const api = express.Router();
const v1Route = require('./v1/init');

api.use('/v1/', v1Route);

module.exports = api;

