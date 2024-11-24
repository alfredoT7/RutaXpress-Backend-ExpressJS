const express = require('express');
const { findBestRoute } = require('../controllers/routeSearchController');

const router = express.Router();
router.get('/find-route', findBestRoute);

module.exports = router;