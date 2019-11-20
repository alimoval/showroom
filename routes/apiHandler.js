const express = require('express');
const mongojs = require('mongojs');

const db = mongojs('mongodb://alik:alik@ds151451.mlab.com:51451/showroom');
const router = express.Router();

module.exports = router;