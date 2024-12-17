const express = require('express');
const { saveLocation } = require('../controllers/ubicationController');

const router = express.Router();

router.post('/save', saveLocation);

module.exports = router;
