const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

// Ruta para subir el archivo GeoJSON
router.post('/upload', routeController.upload, routeController.uploadRoute);
router.get('/:id', routeController.getRouteById);
module.exports = router;