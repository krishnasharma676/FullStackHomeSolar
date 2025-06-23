const express = require('express');
const router = express.Router();
const { calculateSolarData } = require('../controllers/solarController');

router.post('/trackSolarDevice', calculateSolarData);

module.exports = router;
