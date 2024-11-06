const express = require('express');
const router = express.Router();
const userFavoritesController = require('../controllers/userFavoritesController');

router.post('/userFavorites', userFavoritesController.createUserFavorites);
module.exports = router;