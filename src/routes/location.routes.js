const express = require('express');
const { getDriverLocations } = require('../controllers/location');
const router = express.Router();

router.get('/drivers/:routeId', getDriverLocations);

module.exports = router;
