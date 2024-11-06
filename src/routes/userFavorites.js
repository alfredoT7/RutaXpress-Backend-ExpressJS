const express = require('express');
const router = express.Router();
const userFavoritesController = require('../controllers/userFavoritesController');

router.post('/save', userFavoritesController.createUserFavorites);
router.get('/:idUser', userFavoritesController.getUserFavorites);
module.exports = router;