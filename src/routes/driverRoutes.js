const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

router.post('/create', driverController.createDriverRoutes);
router.post('/add', driverController.addRoute);
router.post('/remove', driverController.removeRoute);
router.get('/:idUser', driverController.getDriverRoutes);
router.post('/createDriver', driverController.createDriverWithPhotos);


module.exports = router;