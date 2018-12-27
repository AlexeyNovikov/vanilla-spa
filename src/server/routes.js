const express = require('express');
const data = require('./controllers/data');

const router = express.Router();

router.get('/data', data);

module.exports = router;
