const express = require('express');
const router = express.Router();
const userFavoritesController = require('../controllers/userFavoritesController');

router.post('/add', userFavoritesController.addFavoriteRoute);
router.post('/remove', userFavoritesController.removeFavoriteRoute);
router.get('/:idUser', userFavoritesController.getUserFavoritesAndDescription);
router.get('/id-routes/:idUser', userFavoritesController.getUserFavoriteRouteIds);
module.exports = router;