const express = require('express');
const router = express.Router();
const userFavoritesController = require('../controllers/userFavoritesController');

router.post('/save', userFavoritesController.createUserFavorites);
module.exports = router;